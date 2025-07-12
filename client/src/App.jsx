import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LoginForm from './pages/LoginForm'
import QuestionPostForm from './pages/QuestionPostForm'
import SignupForm from './pages/SignupForm'

function App () {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/post' element={<QuestionPostForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
