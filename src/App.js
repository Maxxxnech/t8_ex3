import React from 'react';
import './App.css';
import TestComponent from './components/TestComponent';
function App() {
  return (
    <div className="App">
      <h1>t8, задание 3:  как правильно обновлять сложный стейт</h1>
      <p>Правильно написанные функции не меняют состояние напрямую!</p>
        <TestComponent />
    </div>
  );
}

export default App;
