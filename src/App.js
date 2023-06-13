import './App.css';

function App() {
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
          Add
        </button>
      </form>
    </>
  );
}

export default App;
