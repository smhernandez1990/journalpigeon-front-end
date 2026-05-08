import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import * as postService from '../../services/postService'

const PostForm = (props) => {

    const { postId } = useParams()

    const initState = {
        title: '',
        mood: '',
        body: '',
        tags: []
    }
   
    const [formData, setFormData] = useState(props.selectedPost ? props.selectedPost : initState)

    useEffect(() => {
        const fetchPost = async () => {
            const postData = await postService.show(postId)
            setFormData(postData)
        }
        if(postId) fetchPost()
        return () => setFormData(initState)
    }, [postId])

    const handleChange = (e) => {
       setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postId ? props.handleUpdatePost(postId, formData) : props.handleAddPost(formData)
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