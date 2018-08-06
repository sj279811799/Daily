# The Cost of JavaScript

### 膨胀的JS与Web的现状

当下网页传输的压缩过的 JavaScript 资源平均大小为 350KB，解压后的资源大小则会超过 1MB；而处理这么多 JavaScript 代码直至网页具备交互性会耗费移动设备超过14秒的时间。

### 膨胀的JS包括

1.运行于客户端的框架或UI库

2.状态管理方案(Redux)

3.Ployfills(兼容性代码)

4.完整的工具库或分割后的代码

5.一套UI组件库，按钮，导航栏等

### 页面交互性解释与建议

[聊聊 JavaScript 与浏览器的那些事 - 引擎与线程](https://link.zhihu.com/?target=https%3A//hijiangtao.github.io/2018/01/08/JavaScript-and-Browser-Engines-with-Threads/)

[Why web developers need to care about interactivity](https://link.zhihu.com/?target=https%3A//philipwalton.com/articles/why-web-developers-need-to-care-about-interactivity/)

### 处理 JavaScript 成本为何如此昂贵

JS的下载，解析，编译占了大部分时间

### 千差万别的移动用户与应对策略

机型多，性能差距大

### 分发更少 JavaScript 的常见技巧

代码分离

### 持续集成四部曲

度量与优化：Lighthouse，service worker

监控：performance budget 

如此往复

