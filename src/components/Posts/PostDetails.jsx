import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import * as postService from '../../services/postService'

const PostDetails = () => {
  
    const { postId } = useParams()

    const [post, setPost] = useState(null)

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
                        </header>
                        <p>{`${c.author?.username} ${new Date(c.createdAt).toLocaleDateString()}`}</p>
                    </article>
                ))}
            </section>
      </main>
  )
}

export default PostDetails