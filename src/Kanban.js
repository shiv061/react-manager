import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Columns from './Columns';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  addColumn,
  moveCards,
  moveColumns,
} from './features/kanban/kanbanSlice';

export default function Kanban() {
  const [title, setTitle] = useState('');
  const [titleOpen, setTitleOpen] = useState(false);
  const { columns } = useSelector((state) => state.kanban);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    if (titleOpen) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [titleOpen]);

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
              <div className="w-60 flex flex-horizontal justify-center p-3 rounded-md shadow-2xl h-full m-2 border_image cursor-pointer group">
                {titleOpen ? (
                  <input
                    className="bg-gray-800 outline-none text-white"
                    type="text"
                    placeholder="Enter Column Title"
                    value={title}
                    ref={inputRef}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        dispatch(addColumn({ title }));
                        setTitleOpen(false);
                        setTitle('');
                      }
                    }}
                  />
                ) : (
                  <>
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
                        setTitleOpen((prev) => !prev);
                      }}
                    >
                      Add Column
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
