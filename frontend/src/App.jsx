import { useState, useEffect } from 'react'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'
import { RefreshButton } from './components/RefreshButton';
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  
  const fetchTodos = () => {
    fetch("http://localhost:3001/todos")
    .then(async (res) => {
      const json = await res.json();
      setTodos(json.allTodos);
    })
    .catch((error) => {
      console.log("Error fetching Todos!!")
      console.log(error);
    })
  }

  useEffect(() => {
    fetchTodos();
  }, [])
  
  return (
    <div className='rootDiv'>
      <CreateTodo />
      <div className='todos'>
        <RefreshButton clickHandler={fetchTodos} />
        <Todos todos={todos}/>
      </div>
      
    </div>
  )
}

export default App
