# react-beautiful-dnd

React拖拽组件库


### 基本用法

```js
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

<DragDropContext>
    // 拖拽区域最外层要用DragDropContext包裹，且只能包裹一层
    <Droppable droppableId type direction>
        // Droppable用于包裹拖放区域
        // droppableId(string): 唯一标识
        // type(string): type相同的才可以相互拖动
        // direction(vertical, horizontal): 拖动方向，默认vertical
        <Draggable draggableId index key>
            // Draggable用于包裹可拖拽元素
            // draggableId(string): 唯一标识
            // index(number): 索引
            // key: react唯一标识，不能和index重复
        </Draggable>
    </Droppable>
</DragDropContext>
```

### 注意事项

1、 Droppable下的可拖拽元素如果是通过observer对象进行渲染，需要将拖拽元素单独拆分为observer组件，否则当observer对象发生变化时，Droppable下的元素不会重渲染。
 
2、Draggable下的index必须连续，否则拖动时不连续的元素定位会有问题。

3、```{provided.placeholder}``` 是起到占位的作用，即元素托起后，其他原来的位置会保留不被占用。