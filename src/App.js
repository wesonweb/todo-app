import './App.css';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './components/Todo';

function App() {
  const [todos, setTodos] = useState(['Todo 1', 'Todo 2', 'Todo 3'])


  const handleSubmit = (event) => {}
  return (
    <>
      <h1>Todo app</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new todo"
        />
        <button
          type="submit">
          Add <AiOutlinePlus size={24} />
        </button>
      </form>
      <ul>
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} />
      ))}
      </ul>
      <p>You have {todos.length} todos</p>
    </>
  );
}

export default App;
