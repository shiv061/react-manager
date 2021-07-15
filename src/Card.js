import { useDispatch, useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { openEditModal, removeTask } from './features/kanban/kanbanSlice';

export default function Card({ id, index, columnId }) {
  const { tasks } = useSelector((state) => state.kanban);
  const taskContent = tasks[id]?.header;
  const dispatch = useDispatch();

  return (
    <Draggable draggableId={id} index={index} key={id}>
      {(provided, snapshot) => {
        return (
          <div
            className={`p-2 flex justify-between items-center bg-gray-700 rounded-md shadow-2xl my-4 group ${
              snapshot.isDragging && 'black'
            }`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => {
              dispatch(openEditModal(id));
            }}
          >
            <p className="text-white flex-1">{taskContent}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => {
                dispatch(removeTask({ columnId, taskId: id }));
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        );
      }}
    </Draggable>
  );
}
