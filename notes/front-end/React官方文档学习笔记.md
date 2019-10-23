# React官方文档学习笔记

完整阅读了一下官网文档，记录一下本次的收获。

## 核心概念

### 组合&继承

在过去的开发中，`props.children`使用的比较少，有些场景更适合使用这种方式，而不是将要显示的内容通过props传递。

### React哲学

过去的开发中大致也是按照文中的流程开发的，但没有明确的总结，这里记录下。

1、将设计好的 UI 划分为组件，单一功能原则

2、用 React 创建一个静态版本，只有props

3、确定 UI state 的最小（且完整）表示，可以计算产生的值，就不要放在state中

4、确定 state 放置的位置，所有使用state的上一级

5、添加反向数据流，callback

## 高级指引

### 无障碍

无障碍这一部分之前一直没仔细看，也没理解这部分的内容。这次仔细看了一遍，其主要介绍的是使用React开发产品时如何考虑特殊人群的使用。

1、首先React对于创建完全可访问网站有着全面支持，通常是使用HTML技术实现。一方面是通过给页面元素增加标签，这些标签可以被阅读软件识别，帮助视力障碍的人群访问网站。

2、另一方面，对于操作有障碍的人群，我们需要满足网站支持全键盘操作，即不使用鼠标就可以完成所有操作。需要考虑的有键盘焦点及焦点轮廓、跳过内容机制、使用程序管理焦点、使用onBlur代替onClick等。

3、还有一些其他方面比如多语言、文档说明、色彩对比度等也是需要考虑的。

### 动态引入

1、通过import()语法实现动态引入，目前还处于提案阶段。

2、React.lazy懒加载组件。

3、Suspense懒加载组件，设置callback用于在组件未加载完成时显示要展示的元素。

4、当模块加载失败，可以使用Error boundaries对异常进行拦截捕获。

5、代码分割可以优化加载速度，一般按照路由进行分割，配合动态加载，提升用户体验。

### Context

Context的使用场景是多个层级都需要访问同一批数据，这时可以将数据放入Context。而对于只是将数据传给层级比较深的组件使用，可以考虑在父级封装好底层组件，然后将组件传入底层渲染，而不必使用Context。

1、`React.createContext`用于创建一个Context，接受一个参数用于设置默认值，当渲染一个订阅此Context的组件时，会从最近的组件树开始匹配Provider读取context，当找不到时，才会取默认值。

2、`Context.Provider`用于提供消费组件，允许消费组件订阅Context变化，接收一个value用于设置context，当多层Provider嵌套时，里层会覆盖外层。当context发生变化，内部消费组件会发生渲染，且不受`shouldComponentUpdate`限制。

3、`Class.contextType`用于绑定最近的Context对象，可以使用`this.context`来获取Context上的值。可以在任何生命周期访问，包括render函数。也可以在类中使用`static`这个类属性初始化Context，`static contextType = MyContext;`。

4、`Context.Consumer`也可以用于订阅Context，这使得可以在函数式组件中使用Context。这种方式需要使用函数作为元素，函数接收当前的context值作为参数，返回React节点。

5、在嵌套组件中更新Context，可以将value和setValue包裹成一个对象传给Context。

6、对于消费多个Context的情况，可以使用`Context.Consumer`这种方式对子组件进行多层包装，在子组件中使用传入的context。

7、当Context的value为对象时，Provider父组件发生渲染时，可能导致子组件发生渲染，因为value会被赋值成新对象。为了防止这种情况，可以将对象放入state中，然后将state赋给value。

### 错误边界

错误边界用于捕获子组件发生的JavaScript错误，并且渲染备用UI，处理错误信息。错误边界无法在事件处理、异步代码、服务端渲染、自身抛出错误等情况下捕获错误。

如果一个class组件包含`static getDerivedStateFromError()`或者`componentDidCatch()`，则它就变成一个错误边界组件，可以在前者中展示错误备用UI，在后者展示错误信息。

自React16开始，未被错误边界捕获的错误会导致这个组件树被卸载。

### Refs转发

`React.forwardRef`可以将父组件props中的ref转发给子组件，接收两个参数，第一个为props，第二个是转发的ref。可以将这个ref赋给子组件，当子组件渲染时，`ref.current`会指向子组件的DOM，这时就可以在调用父组件的地方操作子组件了。对于高阶组件HOC，可以在获取ref后，以props参数的形式向下传递，然后赋值给子组件的ref。

### Fragments

当需要返回list时，可以使用Fragments，他可以对子列表分组，而不用添加额外的DOM节点。

### 高阶组件

高阶组件是参数为组件，返回值为新组件的函数。组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件。

1、使用 HOC 解决横切关注点问题

2、不要改变原始组件。使用组合。

3、约定：将不相关的 props 传递给被包裹的组件

4、约定：最大化可组合性

5、约定：包装显示名称以便轻松调试

注意事项：

1、不要在 render 方法中使用 HOC

2、务必复制静态方法

3、Refs 不会被传递

### 与第三方库协同

主要是利用React改写或包装第三方库。

### 深入 JSX

JavaScript XML，实际上是 React.createElement(component, props, ...children) 函数的语法糖

### 性能优化

[Chrome性能分析工具](https://juejin.im/post/5c8a0c45e51d450d85653590)

shouldComponentUpdate或PureComponent控制组件的渲染，使用不可变数据来使得判断更新更加容易。

### Portals

Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。

```ReactDOM.createPortal(child, container)```

### 不是用ES6 & JSX

这种情况很少，简单了解

### diff算法

1、不同类型节点直接替换

2、相同类型节点进行更新

3、列表增加key，减少节点替换

### Refs and the DOM

以下情况适合refs：
1、管理焦点，文本选择或媒体播放。
2、触发强制动画。
3、集成第三方 DOM 库。

```this.myRef = React.createRef()```创建一个refs，赋值给一个节点的ref属性。

```this.myRef.current```获取一个节点的ref。

无法在函数组件中使用refs，因为它没有实例。但可以通过组件转发的技巧实现一个函数组件的refs使用。

回调 Refs：ref属性赋值一个函数，函数接收一个参数为当前的节点的引用。

### Render Props

指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术。

简单来说就是将要渲染的内容以props传入，组件只实现通用的方法。

这里注意，如果要传入渲染函数，最好先定义好函数，然后将函数赋值给props。否则将导致每次PureComponent失效（每次都会生成一个新的函数实例）。

### 静态类型检查

推荐使用Flow或TypeScript替代PropTypes。

### StrictMode

使用```React.StrictMode```包裹需要开启严格模式的组件。

StrictMode 目前有助于：
1、识别不安全的生命周期
2、关于使用过时字符串 ref API 的警告
3、关于使用废弃的 findDOMNode 方法的警告
4、检测意外的副作用
5、检测过时的 context API

### PropTypes

对组件传入的prop类型进行检查

```js
import PropTypes from 'prop-types';

class Greeting extends React.Component {}

Greeting.propTypes = {
  name: PropTypes.string
};
```

除了类型检查还可检查isRequired，或者使用defaultProps来配置prop默认值。

### 非受控组件

组件值通过ref获取，不用state控制。

### Web Components

一般在使用第三方UI组件时，会使用Web Components。


## API REFERENCE

