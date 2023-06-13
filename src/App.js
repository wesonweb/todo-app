import './App.css';
import { db } from './services/firebase.config'
import { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import Todo from './components/Todo';

function App() {
  const collectionRef = collection(db, 'todos')

  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  // add a todo
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


// delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(collectionRef, id))
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  return (
    <>
      <h1>Todo app</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add a new todo"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          type="submit">
          Add <AiOutlinePlus size={24} />
        </button>
      </form>
      <ul>
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} deleteTodo={deleteTodo}/>
      ))}
      </ul>
      <p>You have {todos.length} todos</p>
    </>
  );
}

export default App;
