import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import { SignIn } from './components/SignIn';
import { TermsAndConditions } from './components/TermsAndConditions';
import { TodosPage } from './components/TodosPage';
import { LandingPage } from './components/LandingPage';
import { UserHome } from './components/UserHome';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route path="/todos" element={<TodosPage />} />
        <Route path="/userhome" element={<UserHome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
