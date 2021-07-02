import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import ItemList from './ItemList';

export default function Columns({ id, items, index, header }) {
  const dispatch = useDispatch();

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={`w-96 ring ring-gray-600 bg-gray-800 rounded-sm p-2 m-2 h-full flex-horizontal ${
            snapshot.isDragging && 'ring-red-400'
          }`}
          {...provided.draggableProps}
        >
          <div className="text-white" {...provided.dragHandleProps}>
            {header}
          </div>
          <ItemList id={id} items={items} />
        </div>
      )}
    </Draggable>
  );
}
