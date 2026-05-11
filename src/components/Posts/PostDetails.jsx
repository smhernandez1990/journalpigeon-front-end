import { useParams, useNavigate, Link } from 'react-router'
import { useState, useEffect, useContext } from 'react'
import * as postService from '../../services/postService'
import * as commentService from '../../services/commentService'
import CommentForm from '../Comments/CommentForm'
import { UserContext } from '../../contexts/UserContext'

const PostDetails = () => {
  
    const { postId } = useParams()

    const { user } = useContext(UserContext)

    const [post, setPost] = useState(null)

    const [posts, setPosts] = useState([])

    //const [comments, setComments] = useState([])

    const navigate = useNavigate()

    const handleDeletePost = async (postId) => {
        const deletedPost = await postService.deletePost(postId)
        setPosts(posts.filter((p) => p._id === deletedPost._id))
        navigate(`/posts/${user._id}`)
    }

    // const handleDeleteComment = async () => {
    //     try {
    //       const deletedComment = await commentService.deleteComment(postId, comment._id);
    //       setComments(comments.filter());
    //     } catch (err) {
    //       console.error("Error deleting comment:", err);
    //     }
    //   };

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
                <>
                <ul className='showPostTags'>
                    Tagged:
                    {post.tags.map((t) => {
                        return (
                        <li key={t}>
                            <Link to={`/posts/tagged/${t}`}>{t}</Link>
                        </li>
                        )
                    })}
                </ul>
                </>
            </section>
            {post.author._id === user._id && (
                <>
                    <Link to={`/posts/${postId}/edit`}>
                        <button>Edit Post</button>
                    </Link>
                    <button onClick={() => handleDeletePost(postId)}>Delete Post</button>
                </>
            )}
            <section>
                <h3>Comments</h3>
                {!post.comments.length && <p>No Comments Yet!</p>}
                {post.comments.map((c) => (
                    <article key={c._id}>
                        <header>
                            <p>
                                {`${c.body}`}
                            </p>
                        </header>
                        <p>{`${c.author.username} ${new Date(c.createdAt).toLocaleDateString()}`}</p>
                        {(c.author._id === user._id) && (
                            <>
                                <button>Edit Comment</button>// will render the comment form using state
                            </>
                        )}
                        {(c.author._id === user._id || post.user_id === user._id) && (
                            <>
                                <button>Delete Comment</button>
                            </>
                        )}
                    </article>
                ))}
                <CommentForm />
            </section>
      </main>
  )
}

export default PostDetails