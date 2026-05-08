import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { UserContext } from './contexts/UserContext'
import { Routes, Route, useNavigate } from 'react-router'
import Navbar from './components/Layout/Navbar/Navbar'
import SignUpForm from './components/Auth/SignUpForm/SignUpForm'
import SignInForm from './components/Auth/SignInForm/SignInForm'
import PostForm from './components/Posts/PostForm'
import Landing from './components/Landing/Landing'
import Dashboard from './components/Layout/Dashboard/Dashboard'
import ExplorePage from './components/Layout/ExplorePage/ExplorePage'
import PostDetails from './components/Posts/PostDetails'
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

  useEffect(() => {
    const fetchAllPosts = async () => {
      const postsData = await postService.index()
      setPosts(postsData)
    }
    if (user) fetchAllPosts()
  }, [user])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={ user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path='/explore' element={<ExplorePage posts={posts} />} />
            <Route path='/posts/:postId' element={<PostDetails />} />
            <Route path='/posts/new' element={<PostForm selectedPost={selectedPost} handleAddPost={handleAddPost} />} />
          </>
        ):(
          <>
          <Route path='/sign-up' element={<SignUpForm />} />
          <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
        
      </Routes>
    </div>
  )
}

export default App