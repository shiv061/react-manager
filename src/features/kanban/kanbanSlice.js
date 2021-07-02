import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

const initialState = {
  columns: [
    {
      id: '1',
      header: 'PLANNED',
      items: ['I1', 'I2'],
    },
    {
      id: '2',
      header: 'DEVELOPMENT',
      items: ['I3', 'I5', 'I6'],
    },
    {
      id: '3',
      header: 'TEST READY',
      items: ['I7'],
    },
    {
      id: '4',
      header: 'TEST DONE',
      items: ['I8', 'I9'],
    },
    {
      id: '5',
      header: 'PRODUCTION',
      items: ['I10'],
    },
  ],
  tasks: {
    I1: 'Hello',
    I2: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In, minus.',
    I3: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quae qui assumenda accusantium eveniet deserunt, eius quo quas magni earum, error delectus. Corporis natus placeat repudiandae delectus deserunt, incidunt recusandae.',
    I4: 'Lorem ipsum dolor sit amet.',
    I5: 'Lorem ipsum dolor sit amet.',
    I6: 'Lorem ipsum dolor sit amet.',
    I7: 'Lorem ss dolor sit amet.',
    I8: 'Lorem ipsum dolor sit amet.',
    I9: 'Lorem dsa dolor sit amet.',
    I10: 'Lorem dsa dolor sit amet.',
  },
  modalOpen: false,
  modalType: 'task',
};

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    moveCards: (state, action) => {
      const same = action.payload.same;
      if (same) {
        const { source, destination } = action.payload;
        const column = state.columns.filter(
          (col) => col.id === source.droppableId
        )[0];
        const items = reorderList(
          column.items,
          source.index,
          destination.index
        );
        const columnIndex = state.columns.findIndex(
          (col) => col.id === source.droppableId
        );
        state.columns[columnIndex].items = items;
      } else {
        const { source, destination } = action.payload;
        const sourceColumn = state.columns.filter(
          (col) => col.id === source.droppableId
        )?.[0];
        const destinationColumn = state.columns.filter(
          (col) => col.id === destination.droppableId
        )?.[0];
        const sourceColumnIndex = state.columns.findIndex(
          (col) => col.id === source.droppableId
        );
        const destinationColumnIndex = state.columns.findIndex(
          (col) => col.id === destination.droppableId
        );
        const sourceItem = state.columns[sourceColumnIndex].items[source.index];

        const newSourceColumn = {
          ...sourceColumn,
          items: [...sourceColumn.items],
        };
        newSourceColumn.items.splice(source.index, 1);

        const newDestinationColumn = {
          ...destinationColumn,
          items: [...destinationColumn.items],
        };
        newDestinationColumn.items.splice(destination.index, 0, sourceItem);

        state.columns[sourceColumnIndex] = newSourceColumn;
        state.columns[destinationColumnIndex] = newDestinationColumn;
      }
    },
    moveColumns: (state, action) => {
      const { from, to } = action.payload;
      state.columns = reorderList(state.columns, from, to);
    },
    setModal: (state, action) => {
      state.modalOpen = action.payload;
    },
    openTaskModal: (state) => {
      state.modalOpen = true;
      state.modalType = 'task';
    },
  },
});

export const { moveCards, moveColumns, setModal, openTaskModal } =
  kanbanSlice.actions;

export default kanbanSlice.reducer;

export function reorderList(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}
