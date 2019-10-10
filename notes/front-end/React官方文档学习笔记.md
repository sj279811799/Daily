# React官方文档学习笔记

完整阅读了一下官网文档，记录一下本次的收获。

## 核心概念

### 组合&继承

在过去的开发中，`props.children`使用的比较少，有些场景更适合使用这种方式，而不是将要显示的内容通过props传递。

### React哲学

过去的开发中大致也是按照文中的流程开发的，但没有明确的总结，这里记录下。

1、将设计好的 UI 划分为组件，单一功能原则

2、用 React 创建一个静态版本，只有props

3、确定 UI state 的最小（且完整）表示

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