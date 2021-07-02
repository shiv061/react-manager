import { Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import Card from './Card';
import { openTaskModal } from './features/kanban/kanbanSlice';

export default function ItemList({ id, items }) {
  const dispatch = useDispatch();

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef}>
          {items.map((itemId, itemIdx) => {
            return <Card key={itemId} id={itemId} index={itemIdx} />;
          })}
          {provided.placeholder}
          <div className="p-2 flex justify-center rounded-md shadow-2xl my-4 border_image cursor-pointer  group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-300 group-hover:text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p
              className="text-white group-hover:text-gray-500"
              onClick={() => {
                dispatch(openTaskModal());
              }}
            >
              Add Task
            </p>
          </div>
        </div>
      )}
    </Droppable>
  );
}
