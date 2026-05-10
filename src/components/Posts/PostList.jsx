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
    : allPosts.filter(p => p.tags.includes(tag))

  return (
    <>
      <h1>Posts By {type === 'selectedUser' ? username : tag}</h1>
      {filteredPosts.map((p) => (
        <article key={p._id}>
          <p>
            <Link to={(`/posts/${p._id}`)}>
              <strong>{p.title}</strong>
            </Link>
          </p>
          {type === 'tag' 
          && (
            <p>by 
              <Link to={`/${p.author._id}`}>{p.author.username}</Link>
            </p>
          )}
        </article>
      ))}
    </>
  )
}

export default PostList