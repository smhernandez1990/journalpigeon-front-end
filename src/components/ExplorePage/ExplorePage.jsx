import { Link } from 'react-router'

const ExplorePage = (props) => {
  
    return (
    <div>
        {props.posts.map((post) => (
            <Link key={post._id} to={`/posts/${post._id}`}>
            <h4><strong>{post.title}</strong></h4>
            </Link>
        ))}
    </div>
  )
}

export default ExplorePage