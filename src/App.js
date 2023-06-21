import { db } from './services/firebase.config'
import { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
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

  // read all todos
  const getTodos = async () => {
    await getDocs(collectionRef).then((todo) => {
      let todoData = todo.docs.map((doc) => (
        {
          id: doc.id,
          ...doc.data()
        }
      ))
      console.log(todoData);
      setTodos(todoData)
    }).catch((error) => {
        console.log(error.message);
      }
    )
  }

  useEffect(() => {
    getTodos()
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

  return (
    <div className="md: container mx-auto px-4">
      <h1 className="text-3xl text-center mt-5">Todo app</h1>
      <form
        className="flex content-center w-100 max-w-3xl mt-4 mx-auto"
        onSubmit={addTodo}>
        <input
          className="border border-gray-400 rounded p-2 w-full"
          type="text"
          placeholder="Add a new todo"
          value={input}
          autoFocus
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          className="flex rounded bg-green-700 text-white p-2 px-4 ml-1 hover:bg-green-600 items-center"
          type="submit">
          Add <AiOutlinePlus size={16} className="ms-2"/>
        </button>
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
      <p className="text-xl mt-3 text-center">{todos.length > 0 ? `You have ${todos.length} ${todos.length === 1 ? "todo" : "todos" }` : "" }</p>
    </div>
  );
}

export default App;
