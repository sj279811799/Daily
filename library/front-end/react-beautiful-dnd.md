# react-beautiful-dnd

[React拖拽组件库](https://github.com/atlassian/react-beautiful-dnd)

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
        // isDropDisabled: 是否可拖放
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
            >
                <Draggable draggableId index key>
                    // Draggable用于包裹可拖拽元素
                    // draggableId(string): 唯一标识
                    // index(number): 索引
                    // key: react唯一标识，不能和index重复
                    // isDragDisabled: 是否可拖动
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                        >
                            <div
                                {...provided.dragHandleProps}
                            >
                                鼠标拖拽区域
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Draggable>
                {provided.placeholder}
            </div>
        )}
    </Droppable>
</DragDropContext>
```

### 注意事项

1、Droppable下的可拖拽元素如果是通过observer对象进行渲染，需要将拖拽元素单独拆分为observer组件，否则当observer对象发生变化时，Droppable下的元素不会重渲染。
 
2、Draggable下的index必须连续，否则拖动时不连续的元素定位会有问题。

3、```{provided.placeholder}``` 是起到占位的作用，即元素托起后，其他原来的位置会保留不被占用。

4、```{...provided.droppableProps}``` 获取可拖放区域属性，必须加在可拖放区域上。

5、```{...provided.draggableProps}``` 获取可拖拽元素属性，必须加在可拖拽的元素上。

6、```{...provided.dragHandleProps}``` 一般放在可拖拽元素上，但比如需要点击可拖拽元素某个位置才能拖拽，则可以把该属性放在这个位置的元素上。

7、```provided: (DroppableProvided)```

```js
type DroppableProvided = {|
    innerRef: (?HTMLElement) => void,
    droppableProps: DroppableProps,
    placeholder: ?Node,
|};

type DroppableProps = {|
    // used for shared global styles
    'data-rbd-droppable-context-id': ContextId,
    // Used to lookup. Currently not used for drag and drop lifecycle
    'data-rbd-droppable-id': DroppableId,
|};
```

8、```snapshot: (DroppableStateSnapshot)```

```js
type DroppableStateSnapshot = {|
    // Is the Droppable being dragged over?
    isDraggingOver: boolean,
    // What is the id of the draggable that is dragging over the Droppable?
    draggingOverWith: ?DraggableId,
    // What is the id of the draggable that is dragging from this list?
    // Useful for styling the home list when not being dragged over
    draggingFromThisWith: ?DraggableId,
    // Whether or not the placeholder is actively being used.
    // This is useful information when working with virtual lists
    // (See our virtual list pattern)
    isUsingPlaceholder: boolean,
|};
```

9、```provided: (DraggableProvided)```

```js
type DraggableProvided = {|
    innerRef: HTMLElement => void,
    draggableProps: DraggableProps,
    // will be null if the draggable is disabled
    dragHandleProps: ?DragHandleProps,
|};
```

10、```snapshot: (DraggableStateSnapshot)```

```js
type DraggableStateSnapshot = {|
    // Set to true if a Draggable is being actively dragged, or if it is drop animating
    // Both active dragging and the drop animation are considered part of the drag
    // *Generally this is the only property you will be using*
    isDragging: boolean,
    // Set to true if a Draggable is drop animating. Not every drag and drop interaction
    // as a drop animation. There is no drop animation when a Draggable is already in its final
    // position when dropped. This is commonly the case when dragging with a keyboard
    isDropAnimating: boolean,
    // Information about a drop animation
    dropAnimation: ?DropAnimation
    // What Droppable (if any) the Draggable is currently over
    draggingOver: ?DroppableId,
    // the id of a draggable that you are combining with
    combineWith: ?DraggableId,
    // if something else is dragging and you are a combine target, then this is the id of the item that is dragging
    combineTargetFor: ?DraggableId,
    // There are two modes that a drag can be in
    // 'FLUID': everything is done in response to highly granular input (eg mouse)
    // 'SNAP': items snap between positions (eg keyboard);
    mode: ?MovementMode,
|};
```