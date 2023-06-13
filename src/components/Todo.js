import './Todo.css'
import { GoTrashcan } from 'react-icons/go'

function Todo({ todo, deleteTodo }) {
  return (
  <li>
    <div>
      <input
        type="checkbox"

      />
      <p
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
