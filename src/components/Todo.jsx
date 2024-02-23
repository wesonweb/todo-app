import './Todo.css'
import { MdDeleteOutline, MdCreate }  from 'react-icons/md'

function Todo({ todo, toggleComplete, deleteTodo }) {

    console.log('the todo: 💙 ', todo)

  const isComplete = "flex justify-between bg-green-100 p-4 my-3 line-through max-w-3xl rounded-md mx-auto text-color-green-600"
  const isNotComplete = "flex justify-between bg-slate-100 p-4 my-3 max-w-3xl mx-auto rounded-md shadow-md text-color-green-600"
  const isChecked = "fs-3 todo-toggle mr-4 checked text-green-600 border-green-300 focus:ring-green-200 me-2 rounded"
  const isNotChecked = "fs-3 border-red-300 me-2"

  return (
  <li className={ todo.completed ? isComplete : isNotComplete }>
    <div className="flex items-center">
      <input
        className={ todo.completed ? isChecked : isNotChecked }
        type="checkbox"
        checked={todo.completed ? true : false }
        onChange={(e) => {toggleComplete(todo)}}
      />
      <p>{todo.text}</p>
    </div>
    <div className="flex gap-2">
        <button
            onClick={() => deleteTodo(todo.id)}
        >
            <MdDeleteOutline
                aria-label="delete"
                size={24}
                className="text-red-500 hover:text-red-600"
            />
        </button>
        {/* <button
            onClick={handleTodoEdit}
        >
            <MdCreate
                aria-label="edit"
                size={24}
                className="text-green-500 hover:text-green-600"
            />
        </button> */}
    </div>
  </li>
)
}
export default Todo
