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