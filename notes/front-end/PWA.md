# PWA

###  什么是PWA

PWA全称Progressive Web App，即渐进式WEB应用。

一个 PWA 应用首先是一个网页, 可以通过 Web 技术编写出一个网页应用. 随后添加上 App Manifest 和 Service Worker 来实现 PWA 的安装和离线等功能.

### 特性

可靠性，快速，响应，可安装，启动画面，高度参与

### 技术组件

Service Worker：Service worker 只是一个 JavaScript 代码的组件，它充当浏览器和 Web 之间的代理。service worker 管理推送通知，并使用浏览器的缓存 API 帮助构建脱机的 Web 应用程序。

Manifest：manifest 文件是一个配置 JSON 文件，其中包含应用程序的信息，例如安装时主屏幕上显示的图标、应用程序的简称、背景颜色或主题。如果 manifest 文件存在，Chrome 浏览器将自动触发 Web 应用程序安装提示，如果用户同意，则会将图标添加到主屏幕并安装 PWA。

HTTPS：Service workers 能够拦截网络请求并可以修改响应。Service workers 在客户端执行所有操作。因此，PWA 需要安全协议 HTTPS。

### 工具和库

Lighthouse，Workbox，nrgok
