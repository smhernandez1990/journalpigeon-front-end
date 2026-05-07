import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { UserContext } from './contexts/UserContext'
import { Routes, Route, useNavigate } from 'react-router'
import Navbar from './components/Navbar/Navbar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import SignInForm from './components/SignInForm/SignInForm'
import PostForm from './components/Posts/PostForm'
import Landing from './components/Landing/Landing'
import Dashboard from './components/Dashboard/Dashboard'
import ExplorePage from './components/ExplorePage/ExplorePage'
import * as postService from './services/postService'


const App = () => {

  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(() => {
    const fetchAllPosts = async () => {
      const postsData = await postService.index()
      setPosts(postsData)
      console.log(posts);
    }
      if (user) fetchAllPosts()
    }, [user])

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
        {user ? (
          <>
            <Route path='/explore' element={<ExplorePage posts={posts} />} />
          </>
        ):(
          <>
          <Route path='/sign-up' element={<SignUpForm />} />
          <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
        <Route path='/posts/new' element={<PostForm selectedPost={selectedPost} handleAddPost={handleAddPost}/>} />
      </Routes>
    </div>
  )
}

export default App