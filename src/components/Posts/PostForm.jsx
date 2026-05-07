import { useState } from 'react'

const initState = {
    title: '',
    mood: '',
    body: '',
    tags: []
}

const PostForm = (props) => {

   
    const [formData, setFormData] = useState(props.selectedPost ? props.selectedPost : initState)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleAddPost(formData)
        setFormData(initState)
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
            <button type='submit'>{props.selectedPost ? 'Update Post' : 'Create Post'}</button>
        </form>
    </div>
  )
}

export default PostForm