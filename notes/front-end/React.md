# React

## jsx如何生成element

jsx

```js
return (
    <div className="cn">
         <Header> Hello, This is React </Header>
         <div>Start to learn right now!</div>
         Right Reserve.
    </div>
)
```

babel编译

属性：type，attributes，children

```js
return (
    React.createElement(
        'div',
        { className: 'cn' },
        React.createElement(
            Header,
            null,
            'Hello, This is React'
        ),
        React.createElement(
            'div',
            null,
            'Start to learn right now!'
        ),
        'Right Reserve'
    )
)
```

render()返回element

children类型：string，原生DOM，React Component，fale，null， undefined，number，array

```js
{
    type: 'div',
    props: {
        className: 'cn',
        children: [
          {
            type: function Header,
            props: {
                children: 'Hello, This is React'
            }
          },
          {
            type: 'div',
            props: {
                children: 'start to learn right now！'
            }
          },
          'Right Reserve'
      ]
  }
}
```

## element如何生成真实节点

![转化](https://github.com/sj279811799/Daily/blob/master/notes/front-end/images/react.png)

### ReactDOMComponent

mountComponent：

将element转成真实DOM节点，并且插入到相应的container里，然后返回markup（realDOM）。

```js
{
    type: 'div',
    props: {
    className: 'cn',
      children: 'Hello world',
    }
}
```

```js
mountComponent(container) {
  const domElement = document.createElement(this._currentElement.type);
  const textNode = document.createTextNode(this._currentElement.props.children);

  domElement.appendChild(textNode);
  container.appendChild(domElement);
  return domElement;
}
```

ReactCompositeComponentWrapper：

实例化自定义组件，最后是通过递归调用到ReactDOMComponent的mountComponent方法来得到真实DOM。

首次渲染

![首次渲染](https://github.com/sj279811799/Daily/blob/master/notes/front-end/images/react1.png)

组件Example

```
<div>hello world</div>
```

React.render

```js
{
  type: function Example,
  props: {
    children: null
  }
}
```

上一步得到的是自定义组件，ReactCompositeComponentWrapper
instance.render()

```js
{
  type: 'div',
    props: {
    children: 'Hello World'
  }
}
```

上一步得到的是原生DOM，ReactDOMComponent,如果上一步得到的还是自定义，就递归调用。

上图中，实例化组件instance对象后，就会检查instance.componentWillMount，有的话则调用。

渲染结束后，调用componentDidMount


## element如何生成真实DOM节点

组件触发更新方式有2种，state和props。

![state](https://github.com/sj279811799/Daily/blob/master/notes/front-end/images/react1.png)

1.更新过程

setState -> pendingState -> dirtyComponent -> uptateComponent

2.updateComponent

计算出nextState -> render()得到nextRenderElement -> 与prevElement进行diff，更新节点

计算出nextState后，调用shouldComponentUpdate，当返回false，后面就不会继续执行。返回true，调用componentWillUpdate，更新完成调用componentDidUpdate。

## diff算法

React基于2个假设：

- 两个相同的组件产生类似的DOM结构，不同组件产生不同DOM结构

- 对于同一层次的一组子节点，它们可以通过唯一的id区分

发明了diff算法，将复杂度由O(n^3)降到O(n)。

![diff](https://github.com/sj279811799/Daily/blob/master/notes/front-end/images/react3.png)

基于第一个假设，diff只会对同级节点进行比较，父级不同，子节点就不会进行比较。

diff具体过程，从三个方面考虑：

### 节点类型不同

基于第一条，节点不同，会直接删除旧的节点

```js
<A>
  <C/>
</A>
// 由shape1到shape2
<B>
  <C/>
</B>
```

过程如下：

```
Shape1 :
A is created 
A render
C is created
C render
C componentDidMount
A componentDidMount
Shape2 :
A componentWillUnmount
C componentWillUnmount
B is created
B render
C is created
C render
C componentDidMount
B componentDidMount
```

优化思路：要保持DOM的稳定性，对于子节点复杂的组件，切换时保证父节点不变。

### 节点类型相同

2种情况，一种DOM类型，对应html支持div, span, p；一种自定义组件。

#### DOM类型：

react会对比它们的属性，只改变需要改变的属性

```html
<div className="before" title="stuff" />
<div className="after" title="stuff" />
```
这个之只会更新className

```html
<div style={{color: 'red', fontWeight: 'bold'}} />
<div style={{color: 'green', fontWeight: 'bold'}} />
```
只会更新color

#### 自定义组件类型

由于此时React不知道如何更新DOM树，因为逻辑都在组件里，所以只能更新props，触发更新过程，然后对子节点进行diff的递归比较更新。

```
- shouldComponentUpdate
- componentWillReceiveProps
- componentWillUpdate
- render
- componentDidUpdate
```

### 子节点比较

```
<div>
  <A />
  <B />
</div>
// 列表一到列表二
<div>
  <A />
  <C />
  <B />
</div>
```

React在没有key的情况下，是按顺序一个个对比，在没有key的情况下，会把B删除，然后创建C,最后创建B。

```
列表一：
A is created
A render
B is created
B render
A componentDidMount
B componentDidMount
列表二：
A render
B componentWillUnmount
C is created
C render
B is created
B render
A componentDidUpdate
C componentDidMount
B componentDidMount
```

当节点很多，这种效率很低。有两种方式解决：

1.保持DOM稳定，上面的变化，节点有2个变3个，我们可以通过加一个null，保持DOM稳定。这样B不会被卸载重新创建。

2.给节点加上稳定，可预测，唯一的key

```
A render
C is created
C render
B render
A componentDidUpdate
C componentDidMount
B componentDidUpdate
```

优化思路：要保持DOM的稳定性。map的时候，加key


待解决：

1.react如何判断节点中有key，然后有key的情况下，具体如何处理。

2.传统diff的复杂度为何是O(n^3)。