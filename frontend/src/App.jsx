import { useState, useEffect } from 'react'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'
import { RefreshButton } from './components/RefreshButton';

function App() {
  const [todos, setTodos] = useState([]);
  
  const fetchTodos = () => {
    fetch("http://localhost:3001/todos")
    .then(async (res) => {
      const json = await res.json();
      setTodos(json.allTodos);
    })
  }

  useEffect(() => {
    fetchTodos();
  }, [])
  
  return (
    <div>
      <CreateTodo />
      <RefreshButton clickHandler={fetchTodos} />
      <Todos todos={todos}/>
    </div>
  )
}

export default App
