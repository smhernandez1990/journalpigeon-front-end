import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import { Link, useNavigate } from 'react-router'
import * as postService from '../../../services/postService'

const Dashboard = () => {
    
    const { user } = useContext(UserContext)
    const [myLoadedPosts, setMyLoadedPosts] = useState(5)
    const [latestLoadedPosts, setLatestLoadedPosts] = useState(5)
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    const filteredUserPosts = posts.filter((p) => p.author._id === user._id)

    useEffect(() => {
        const fetchAllPosts = async () => {
            const postsData = await postService.index()
                setPosts(postsData)
        }
        if (user) fetchAllPosts()
    }, [user])
    
    if (!posts) return <main>Loading...</main>
  return (
    <div>
        <section>
        <h1>Welcome Back, {user.username}</h1>
        <h2>Your Latest Posts</h2>
            {filteredUserPosts.slice(0, myLoadedPosts).map((p) => (
                <article key={p._id}>
                    <p>
                        <Link to={`/posts/${p._id}`}>
                            <strong>{p.title}</strong>
                        </Link>
                    </p>
                </article>
            ))}
            {(myLoadedPosts < filteredUserPosts.length && myLoadedPosts < 10) && (
                  <button onClick={() => setMyLoadedPosts((prev) => prev + 5)}>Load More Posts</button>
            )}
            {(myLoadedPosts < filteredUserPosts.length && myLoadedPosts >= 10) &&
                <button onClick={() => navigate(`/${user.username}`)}>All My Posts</button>
            }
        </section>
        <section>
            <h3>Latest From The Flock</h3>
                {posts.slice(0, latestLoadedPosts).map((p) => (
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
                {(latestLoadedPosts < posts.length && latestLoadedPosts < 10) 
                    && 
                    <button onClick={() => setLatestLoadedPosts((prev) => prev + 5)}>Load More Posts</button>
                }
                {(latestLoadedPosts < posts.length && latestLoadedPosts >= 10)
                    && 
                  <button onClick={() => navigate('/posts')}>Explore All Latest</button>
                }    
            <h3>Subscribed</h3>
            <p>Feature Coming Soon!</p>
        </section>
    </div>
  )
}

export default Dashboard