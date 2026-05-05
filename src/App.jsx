import { useContext } from 'react'
import { UserContext } from './contexts/UserContext'
import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar/Navbar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import SignInForm from './components/SignInForm/SignInForm'
import Landing from './components/Landing/Landing'
import Dashboard from './components/Dashboard/Dashboard'


const App = () => {

  const { user } = useContext(UserContext)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={ user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
      </Routes>
    </div>
  )
}

export default App