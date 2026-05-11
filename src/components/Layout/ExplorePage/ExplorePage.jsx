import { Link } from 'react-router'
import { useState, useEffect, useContext } from 'react'
import * as postService from '../../../services/postService'
import { UserContext } from '../../../contexts/UserContext'

const ExplorePage = () => {

    const { user } = useContext(UserContext)

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchAllPosts = async () => {
            const postsData = await postService.index()
            setPosts(postsData)
        }
        if (user) fetchAllPosts()
    }, [user])

    if (!posts) return <main>Loading...</main>

    
    return (
        <>
        <h1>Flock Talk</h1>
            {posts.map((p) => (
                <article key={p._id}>
                    <p>
                        <Link to={`/posts/${p._id}`}>
                            <strong>{p.title}</strong>
                        </Link>
                        {' '} by {' '}
                        <Link to={`/${p.author.username}`}>{p.author.username}</Link>
                    </p>
                </article>
            ))}
        </>
    )
}

export default ExplorePage