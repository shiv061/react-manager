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
      items: ['I3', 'I4'],
    },
  ],
  tasks: {
    I1: { header: 'Learn React', content: 'Best Javascript Library' },
    I2: {
      header: 'Learn Typescript',
      content: 'For better type checking',
    },
    I3: {
      header: 'Buy a laptop',
      content: 'Macbook air M1',
    },
    I4: {
      header: 'Start adding',
      content: 'feel free to create a pull request if you want to contribute',
    },
  },
  modalOpen: false,
  modalType: 'task',
  currentColumn: null,
  editTaskId: null,
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
      if (action.payload === false) {
        state.currentColumn = null;
      }
    },
    openTaskModal: (state, action) => {
      state.modalOpen = true;
      state.modalType = 'task';
      state.currentColumn = action.payload.id;
      state.editTaskId = null;
    },
    setCurrentColumn: (state, action) => {
      state.currentColumn = action.payload;
    },
    addTask: (state, action) => {
      const taskId = v4();
      const columnId = action.payload.columnId;
      state.tasks[taskId] = {
        header: action.payload.header,
        content: action.payload.content,
      };
      const columnIdx = state.columns.findIndex((col) => col.id === columnId);
      state.columns[columnIdx].items.push(taskId);
      state.modalOpen = false;
      state.currentColumn = null;
    },
    editTask: (state, action) => {
      state.tasks[action.payload.editId] = {
        header: action.payload.header,
        content: action.payload.content,
      };
      state.editTaskId = null;
      state.modalOpen = false;
    },
    removeTask: (state, action) => {
      const columnId = action.payload.columnId;
      const taskId = action.payload.taskId;
      const columnIdx = state.columns.findIndex((col) => col.id === columnId);
      state.columns[columnIdx].items = state.columns[columnIdx].items.filter(
        (it) => it !== taskId
      );
      delete state.tasks[taskId];
    },
    addColumn: (state, action) => {
      const id = v4();
      const title = action.payload.title;
      state.columns.push({
        id,
        header: title,
        items: [],
      });
    },
    openEditModal: (state, action) => {
      state.modalOpen = true;
      state.modalType = 'task';
      state.editTaskId = action.payload;
    },
  },
});

export const {
  moveCards,
  moveColumns,
  setModal,
  openTaskModal,
  addTask,
  removeTask,
  addColumn,
  openEditModal,
  editTask,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;

export function reorderList(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}
