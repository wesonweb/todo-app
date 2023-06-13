import './Todo.css'
import { GoTrashcan } from 'react-icons/go'

function Todo({ todo }) {
  return (
  <li>
    <div>
      <input
        type="checkbox"

      />
      <p
      >{todo.text}</p>
    </div>
    <button>
      <GoTrashcan
        size={24}
      />
    </button>
  </li>
)
}
export default Todo
