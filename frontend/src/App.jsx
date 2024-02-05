import { useState, useEffect } from 'react'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'
import { RefreshButton } from './components/RefreshButton';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import { SignIn } from './components/SignIn';
import { TermsAndConditions } from './components/TermsAndConditions';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route path="/todos" element={<TodosPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


function TodosPage() {
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