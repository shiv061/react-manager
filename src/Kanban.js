import { useDispatch, useSelector } from 'react-redux';
import Columns from './Columns';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { moveCards, moveColumns } from './features/kanban/kanbanSlice';

export default function Kanban() {
  const { columns } = useSelector((state) => state.kanban);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.type === 'column') {
      dispatch(
        moveColumns({ from: result.source.index, to: result.destination.index })
      );
      return;
    }

    if (result.source.droppableId === result.destination.droppableId) {
      dispatch(
        moveCards({
          source: result.source,
          destination: result.destination,
          same: true,
        })
      );
      return;
    }
    dispatch(
      moveCards({
        source: result.source,
        destination: result.destination,
        same: false,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className="bg-gray-800 w-full"
        style={{ height: 'calc(100vh - 64px)' }}
      >
        <Droppable
          droppableId="all-droppables"
          type="column"
          direction="horizontal"
        >
          {(provided) => (
            <div
              className="p-4 w-full overflow-x-auto flex flex-nowrap"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {columns?.map((column, idx) => (
                <Columns
                  key={column.id}
                  id={column.id}
                  index={idx}
                  items={column.items}
                  header={column.header}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
