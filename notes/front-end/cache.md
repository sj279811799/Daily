# cache

### 前端缓存/后端缓存

基本的网络请求就是三个步骤：请求，处理，响应。

后端缓存主要集中于处理阶段，前端缓存则在请求和响应阶段，响应阶段需要和后端共同配合。

## 按缓存位置分类

请求的优先级：

- Service Worker

- Memory Cache

- Disk Cache

- 网络请求

### Memory Cache

preloader的资源会被放入内存，供后面解析执行。

preload是显示指定预加载的资源。

从内存加载数据时，浏览器会忽略max-age=0, no-cache 等头部配置，从内存读取。如果不想资源进入缓存，可以加no-store头部配置。

### Disk Cache

存储在硬盘上，不同站点可以共用相同文件。严格根据请求头配置执行缓存。

### Service Worker

与Cache不同，Service Worker允许用户自行读取缓存，有自己单独的存储位置，并且缓存是永久的，之后调用函数或缓存满了才会清除。

### 网络请求

如果缓存中没有命中，则在网络上去请求。具体来说：

- 根据 Service Worker 中的 handler 决定是否存入 Cache Storage (额外的缓存位置)。

- 根据 HTTP 头部的相关字段(Cache-control, Pragma 等)决定是否存入 disk cache

- memory cache 保存一份资源 的引用，以备下次使用。

## 按失效策略分类


### 强制缓存 (也叫强缓存)

