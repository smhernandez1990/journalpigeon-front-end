import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from './contexts/UserContext'
import { Routes, Route, useNavigate } from 'react-router'
import Navbar from './components/Layout/Navbar/Navbar'
import SignUpForm from './components/Auth/SignUpForm/SignUpForm'
import SignInForm from './components/Auth/SignInForm/SignInForm'
import PostForm from './components/Posts/PostForm'
import Landing from './components/Landing/Landing'
import Dashboard from './components/Layout/Dashboard/Dashboard'
import ExplorePage from './components/Layout/ExplorePage/ExplorePage'
import * as postService from './services/postService'


const App = () => {

  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)

  const handleAddPost = async (formData) => {
    try {
      const newPost = await postService.create(formData)
      if (newPost.err) {
        throw new Error(newPost.err)
      }
      setPosts((prev) => prev + newPost)
      navigate('/explore')
    } catch (error) {
      console.log(error);
    }
  }

  const handleSelectedPost = async (post) => {
    setSelectedPost(post)
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={ user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/posts/new' element={<PostForm selectedPost={selectedPost} handleAddPost={handleAddPost}/>} />
        <Route path='/explore' element={<ExplorePage />} />
      </Routes>
    </div>
  )
}

export default App