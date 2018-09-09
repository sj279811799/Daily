# snabbdom

### snabbdom

Virtual DOM 的一种实现。核心代码只有 200 行，丰富的测试用例。

### Virtual DOM

通俗的说，Virtual DOM 就是一个 js 对象，它是真实 DOM 的抽象，只保留一些有用的信息，更轻量地描述 DOM 树的结构。

用js表示dom，可以对新旧两个都买对比，这就是diff算法。

### 源码分析

init：接收modules和可选domApi，收集hook，定义函数，返回patch。

h：创建dom

patch：更新dom

createElm：

patchVnode：

updateChildren：

addVnodes：

 removeVnodes：

thunk：