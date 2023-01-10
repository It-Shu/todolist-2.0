import React from 'react';
import './App.css';
import Todolist from "./components/Todolist";

function App() {
  return (
    <div className="App">
        <Todolist name='What to learn'/>
        <Todolist name='Haha'/>
        <Todolist name='HoHo'/>
    </div>
  );
}

export default App;
