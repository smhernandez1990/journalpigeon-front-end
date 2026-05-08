import { Link } from 'react-router'

const ExplorePage = (props) => {

    return (
        <>
            {props.posts.map((post) => (
                <article>
                <p>
                <Link key={post._id} to={`/posts/${post._id}`}>
                    <strong>{post.title}</strong>
                </Link>
                {' '} by {' '}
                <Link to={`/${post.author._id}`}>{post.author.username}</Link>
                </p>
                </article>
            ))}
        </>
    )
}

export default ExplorePage