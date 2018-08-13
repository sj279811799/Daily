# 如何更愉快地使用rem

### rem

rem与em类似，只不过rem不是根据父级元素去决定大小，而是根据root节点来决定。root节点字体默认取浏览器的设置。

### 何时使用

用户可以使用ctrl或设置浏览器字号改变页面字体，但如果使用的是px，设置浏览器字号是不会改变页面字体大小的。

所以，对于font-siza可以使用rem，border使用px，其他如margin，padding等可以用em。

### 引入媒体查询

通过媒体查询，设置root的字号，从而是字号整体适应屏幕

```css
:root {                            
  font-size: 0.75em;               
}                                  
@media (min-width: 800px) {        
  :root {                          
    font-size: 0.875em;            
  }                                
}                                  
@media (min-width: 1200px) {       
  :root {                          
    font-size: 1em;                
  }
}
```

### 设置组件字号

组件和整个页面类似，只需要在组件根节点设置一个rem，组件内设置em，这样当需要调整组件字号，只需要修改根节点就可以了。

```css
.panel {
  font-size: 1rem;
  padding: 1em;
  border: 1px solid #999;
  border-radius: 0.5em;
}
.panel > h2 {
  margin-top: 0;
  font-size: 0.8em;
  font-weight: bold;
  text-transform: uppercase;
}
```
