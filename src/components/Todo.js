import './Todo.css'
import { GoTrashcan } from 'react-icons/go'

function Todo({ todo, toggleComplete, deleteTodo }) {

  const isComplete = "flex justify-between bg-slate-300 p-4 my-2 line-through"
  const isNotComplete = "flex justify-between bg-slate-100 p-4 my-2"

  return (
  <li className={ todo.completed ? isComplete : isNotComplete}>
    <div>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={(e) => {toggleComplete(todo)}}
      />
      <p
        onClick={() => {toggleComplete(todo)}}
      >{todo.text}</p>
    </div>
    <button
      onClick={() => deleteTodo(todo.id)}
    >
      <GoTrashcan
        size={24}
      />
    </button>
  </li>
)
}
export default Todo
