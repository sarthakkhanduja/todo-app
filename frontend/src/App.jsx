import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import { SignIn } from './components/SignIn';
import { TermsAndConditions } from './components/TermsAndConditions';
import { TodosPage } from './components/TodosPage';

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
