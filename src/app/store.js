import { configureStore } from '@reduxjs/toolkit';
import kanbanSlice from '../features/kanban/kanbanSlice';

export const store = configureStore({
  reducer: {
    kanban: kanbanSlice,
  },
  devTools: process.env.NODE_ENV === 'development' ? true : false
});
