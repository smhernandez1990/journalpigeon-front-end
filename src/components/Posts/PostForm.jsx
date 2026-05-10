import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import * as postService from '../../services/postService'

const initState = {
    title: '',
    mood: '',
    body: '',
    tags: [],
}

const PostForm = () => {

    const { postId } = useParams()
    const navigate = useNavigate()

    // eslint-disable-next-line no-unused-vars
    const [post, setPost] = useState(null)
    const [posts, setPosts] = useState([])
    const [tagVals, setTagVals] = useState('')
    const [formData, setFormData] = useState(initState)

    useEffect(() => {
        const fetchPost = async () => {
            const postData = await postService.show(postId)
            setPost(postData)
            setFormData({
                ...postData,
                tags: postData.tags ? postData.tags.join(', ') : ''
            })
            setTagVals(postData.tags ? postData.tags.join(', ') : '')
        }
        if (postId) fetchPost()
        return () => setFormData(initState)
    }, [postId])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const processedTags = tagVals
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0)

    const handleAddPost = async (formData) => {
        try {
            const newPost = await postService.create({...formData, tags: processedTags})
            if (newPost.err) {
                throw new Error(newPost.err)
            }
            setPosts((prev) => [...prev, newPost]),
                navigate('/explore')
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdatePost = async (postId, postFormData) => {
        const updatedPost = await postService.update(postId, {...postFormData, tags: processedTags})
        setPosts(posts.map((p) => (postId === p._id ? updatedPost : p)))
        navigate(`/posts/${postId}`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postId ? handleUpdatePost(postId, formData) : handleAddPost(formData)
        setFormData(initState)
        setTagVals('')
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
                    value={tagVals}
                    onChange={(e) => setTagVals(e.target.value)}
                    placeholder='Separate tags with commas'
                />
                <button type='submit'>{postId ? 'Update Post' : 'Create Post'}</button>
            </form>
        </div>
    )
}

export default PostForm