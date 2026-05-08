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
import PostList from './components/Posts/PostList'
import * as postService from './services/postService'


const App = () => {

  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  
  const [posts, setPosts] = useState([])

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

  const handleUpdatePost = async (postId, postFormData) => {
    const updatedPost = await postService.update(postId, postFormData)
    setPosts(posts.map((p) => (postId === p._id ? updatedPost : p)))
    navigate(`/posts/${postId}`)
  }

  const handleDeletePost = async (postId) => {
    const deletedPost = await postService.deletePost(postId)
    setPosts(posts.filter((p) => p._id === deletedPost._id))
    navigate('/posts')
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
            <Route path='/posts/:postId' element={<PostDetails handleDeletePost={handleDeletePost} />} />
            <Route path='/posts/new' element={<PostForm handleAddPost={handleAddPost} />} />
            <Route path='/posts/:postId/edit' element={<PostForm  handleUpdatePost={handleUpdatePost} />} />
            <Route path='/post' element={<PostList />} />
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