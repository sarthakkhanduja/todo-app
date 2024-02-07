import { useState, useEffect } from 'react'
import { CreateTodo } from './CreateTodo'
import { Todos } from './Todos'
import { RefreshButton } from './RefreshButton';

export function TodosPage() {
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
  
    return(
      <div className='flex flex-col'>
        <CreateTodo />
        <div className='todos'>
          <RefreshButton clickHandler={fetchTodos} />
          <Todos todos={todos}/>
        </div>
        
      </div>
    )
  }