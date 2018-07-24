# React组件模式

### API

声明式：声明你需要什么，让计算机去想改怎么做。如SQL，只需告诉数据库想要的结果集，数据库实现如何去取值

命令式：所有命令都需要自己实现

### React API

render，state，props，context，lifecycle events

### 组件分类

有状态(stateful)：render，state，lifecycle events

无状态(stateless)：render，props，context

### 组件模式

容器组件：有状态的类组件，封装了数据逻辑层

展示组件：无状态的函数式组件

高阶组件HOC：把组件当做参数，并返回新的组件，如withRouter

渲染组件(render callbacks)：通过this.props.children接收并展示父组件传入的dom
