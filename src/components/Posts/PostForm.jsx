import { useState } from 'react'
import * as postService from './services/postService'

const initState = {
    title: '',
    mood: '',
    body: '',
    tags: []
}

const PostForm = (props) => {

    const [posts, setPosts] = useState([])
    const [selectedPost, setSelectedPost] = useState(null)
    const [formData, setFormData] = useState(props.selectedPost ? props.selectedPost : initState)

    const handleChange = (e) => {
        setFormData((prev) => prev + [e.target.name]: e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleAddNewPost(formData)
        setFormData(initState)
    }
  
    const handleAddPost = async (formData) => {
        try {
            const newPost = await postService.create(formData)
            if(newPost.err){
                throw new Error(newPost.err)
            }
            setPosts((prev) => prev + newPost)
        } catch (error) {
            
        }
    }
    return (
    <div>
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
                value={formData.title}
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
        </form>
    </div>
  )
}

export default PostForm