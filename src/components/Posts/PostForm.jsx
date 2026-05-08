import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import * as postService from '../../services/postService'

const PostForm = () => {

    const { postId } = useParams()
    const navigate = useNavigate()

    const initState = {
        title: '',
        mood: '',
        body: '',
        tags: []
    }

    const [post, setPost] = useState(null)

    const [posts, setPosts] = useState([])

    const [formData, setFormData] = useState(post ? post : initState)

    useEffect(() => {
        const fetchPost = async () => {
            const postData = await postService.show(postId)
            setPost(postData)
        }
        if(postId) fetchPost()
        return () => setFormData(initState)
    }, [postId])

    const handleChange = (e) => {
       setFormData({ ...formData, [e.target.name]: e.target.value})
    }

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

    const handleSubmit = (e) => {
        e.preventDefault()
        postId ? handleUpdatePost(postId, formData) : handleAddPost(formData)
        setFormData(initState)
    }
   

    return (
    <div>
        <h1>{postId ? 'Edit Post' : 'New Post'}</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title </label>
            <input
                id='title'
                name='title'
                value={formData.title}
                onChange={handleChange}
                required
            />
            <label htmlFor="mood">Mood </label>
            <input
                id='mood'
                name='mood'
                value={formData.mood}
                onChange={handleChange}
            />
            <label htmlFor="body">Body </label>
            <input
                id='body'
                name='body'
                value={formData.body}
                onChange={handleChange}
                required
            />
            <label htmlFor="tags">Tags </label>
            <input
                id='tags'
                name='tags'
                value={formData.tags}
                onChange={handleChange}
            />
            <button type='submit'>{postId ? 'Update Post' : 'Create Post'}</button>
        </form>
    </div>
  )
}

export default PostForm