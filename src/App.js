import { db } from './services/firebase.config'
import { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import Todo from './components/Todo';

function App() {
  const collectionRef = collection(db, 'todos')

  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  // create a todo
  const addTodo = async (event) => {
    event.preventDefault()
    if(input === '') {
      alert('Please enter a todo')
      return
    }
    const docRef = await addDoc(collectionRef, {
      text: input,
      completed: false,
      timestamp: serverTimestamp()
    })
    setTodos([...todos, {
      id: docRef.id,
      text: input,
      completed: false
    }])
    setInput('')
  }

  useEffect(() => {
    const getTodos = async () => {
    await getDocs(collectionRef).then((todo) => {
      let todoData = todo.docs.map((doc) => (
        {
          id: doc.id,
          ...doc.data()
        }
      ))
      setTodos(todoData)
    }).catch((error) => {
        console.log(error.message);
      }
    )
  }
    getTodos()
    // eslint-disable-next-line
  }, [])

  // update todo
  const toggleComplete = async (todo) => {
    await updateDoc(doc(collectionRef, todo.id), {
      completed: !todo.completed
      })
    const newTodos = todos.map((item) => {
      if(item.id === todo.id) {
        return {
          ...item,
          completed: !item.completed
        }
      }
      return item
    }
    )
    setTodos(newTodos)
  }

// delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(collectionRef, id))
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const todosLength = todos.filter((todo) => todo.completed !== true).length
  console.log(`there are ${todosLength} todos not completed`)


  return (
    <div className="h-screen w-full bg-ocean-500 flex justify-center items-center">
      <div className="max-w-2xl px-4 bg-white rounded shadow-lg">
          <div className="p-4">
            <h1 className="text-3xl text-center pt-5">What can you cross off your list today?</h1>
            <form
              className="w-100 max-w-3xl my-8 mx-auto"
              onSubmit={addTodo}>
              <label htmlFor="todo-input" className="block mb-1 text-gray-700">Add a new todo</label>
              <div className="flex content-center">
                <input
                  className="border border-gray-400 rounded p-2 w-full"
                  name="todo-input"
                  type="text"
                  placeholder="eg water the plants..."
                  value={input}
                  autoFocus
                  onChange={(event) => setInput(event.target.value)}
                />
                <button
                  className="flex rounded bg-green-700 text-white p-2 px-4 ml-1 hover:bg-green-600 items-center"
                  type="submit">
                  Add <MdAdd size={24} className="ms-1"/>
                </button>
              </div>
            </form>
            <ul>
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                deleteTodo={deleteTodo}
                toggleComplete={toggleComplete}
              />
            ))}
            </ul>
            {console.log(todos)}
            <p className="text-xl text-gray-700 my-6 text-center">
            {todosLength > 0 ? `You have ${todosLength} ${todosLength === 1 ? "todo" : "todos" }` : "" }
            </p>
          </div>
        </div>
    </div>
  );
}

export default App;
