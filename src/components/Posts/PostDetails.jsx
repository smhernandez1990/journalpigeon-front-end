import { useParams, useNavigate } from 'react-router'
import { useState, useEffect, useContext } from 'react'
import * as postService from '../../services/postService'
import CommentForm from '../Comments/CommentForm'
import { UserContext } from '../../contexts/UserContext'

const PostDetails = () => {
  
    const { postId } = useParams()

    const { user } = useContext(UserContext)

    const [post, setPost] = useState(null)

    const [posts, setPosts] = useState([])

    const navigate = useNavigate()

    const handleDeletePost = async (postId) => {
        const deletedPost = await postService.deletePost(postId)
        setPosts(posts.filter((p) => p._id === deletedPost._id))
        navigate(`/posts/${user._id}`)
    }

    useEffect(() => {
        const fetchPost = async () => {
            const postData = await postService.show(postId)
            setPost(postData)
        }
        fetchPost()
    }, [postId])
    
    if (!post) return <main>Loading...</main>
    return (
      <main>
            <section>
                <header>
                    <h1>{post.title}</h1>
                    <h2>{`${post.author.username} posted this on ${new Date(post.createdAt).toLocaleDateString()}`}</h2>
                </header>
                <p>{post.body}</p>
            </section>
            <section>
                <h3>Comments</h3>
                {!post.comments.length && <p>No Comments Yet!</p>}
                {post.comments.map((c) => (
                    <article key={c._id}>
                        <header>
                            <p>
                                {`${c.body}`}
                            </p>
                            {post.author._id === user._id && (
                                <>
                                    <button onClick={() => handleDeletePost(postId)}>Delete Post</button>
                                </>
                            )}
                        </header>
                        <p>{`${c.author.username} ${new Date(c.createdAt).toLocaleDateString()}`}</p>
                    </article>
                ))}
                <CommentForm />
            </section>
      </main>
  )
}

export default PostDetails