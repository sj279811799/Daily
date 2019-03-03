# React 优化

## 渲染优化

### 通过改变生效的css来改变样式

通过增加一个节点来控制复杂节点的样式，当样式发生改变时，只需要更新结构简单的controller即可。

当controller生效时，通过css中的相邻兄弟选择器“+”使复杂节点的样式发生变化。

```js
<div class={isTrue ? 'controller' : ''} />
<div className="colume">
    // children
</div>
```

```css
.controller + colume {
    // style
}
```
