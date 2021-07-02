import { useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

export default function Card({ id, index }) {
  const { tasks } = useSelector((state) => state.kanban);
  const taskContent = tasks[id];

  return (
    <Draggable draggableId={id} index={index} key={id}>
      {(provided, snapshot) => {
        return (
          <div
            className={`p-2 bg-gray-700 rounded-md shadow-2xl my-4 ${
              snapshot.isDragging && 'black'
            }`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <p className="text-white">{taskContent}</p>
          </div>
        );
      }}
    </Draggable>
  );
}
