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