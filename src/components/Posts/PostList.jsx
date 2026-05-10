import { useParams, Link } from 'react-router'
import { useState, useEffect, useContext } from 'react'
import * as postService from '../../services/postService'
import { UserContext } from '../../contexts/UserContext'

const PostList = ({ type }) => {

  const { user } = useContext(UserContext)
  const { username, tag } = useParams()

  const [allPosts, setAllPosts] = useState([])

  useEffect(() => {
    const fetchAllPosts = async () => {
      const postsData = await postService.index()
      setAllPosts(postsData)
    }
    if (user) fetchAllPosts()
  }, [user])

  if (!allPosts) return <main>Loading...</main>

  const filteredPosts = type === 'selectedUser'
    ? allPosts.filter(p => p.author.username === username)
    : allPosts.filter(p => p.tags.some((tg) => tg === tag))

  return (
    <main>
      {type === 'selectedUser'
      ? <h1>{username}'s Posts</h1>
      : <h1>Posts Tagged '{tag}'</h1>
      }

      {filteredPosts.map((p) => (
        <article key={p._id}>
          <p>
            <Link to={`/posts/${p._id}`}>
              <strong>{p.title}</strong>
            </Link>
            {type !== 'selectedUser' && (
              <>
                {' '}by{' '}
                <Link to={`/${p.author.username}`}>{p.author.username}</Link>
              </>
            )}
            </p>
         </article>
       ))}
       {!filteredPosts.length && <p>No Posts Yet!</p>}
    </main>
  )
}

export default PostList