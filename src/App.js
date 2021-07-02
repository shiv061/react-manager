import React from 'react';
import Kanban from './Kanban';
import Header from './Header';
import AppModal from './Modal';
import { useSelector } from 'react-redux';

function App() {
  return (
    <div>
      <Header />
      <Kanban />
      <AppModal />
    </div>
  );
}

export default App;
