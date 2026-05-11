import { useParams, useNavigate, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import * as postService from "../../services/postService";
import * as commentService from "../../services/commentService";
import CommentForm from "../Comments/CommentForm";
import { UserContext } from "../../contexts/UserContext";

const PostDetails = () => {
  const { postId } = useParams();
  const { user } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await postService.show(postId);
        setPost(postData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [postId]);

  const handleDeletePost = async (postId) => {
    try {
      await postService.deletePost(postId);
      navigate(`/${user.username}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (commentFormData) => {
    try {
      const newComment = await commentService.createComment(postId, commentFormData);
      setPost({
        ...post,
        comments: [...post.comments, newComment],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentService.deleteComment(postId, commentId);
      setPost({
        ...post,
        comments: post.comments.filter((c) => c._id !== commentId),
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!post) return <main>Loading...</main>;

  return (
    <main>
      <section>
        <header>
          <h1>{post.title}</h1>
          <h3>
            <Link to={`/${post.author.username}`}>{post.author.username}</Link> posted on{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </h3>
        </header>
        <p>{post.body}</p>
        {post.tags.length > 0 && (
          <ul className="showPostTags">
            Tagged:
            {post.tags.map((t) => (
              <li key={t}>
                <Link to={`/posts/tagged/${t}`}>{t}</Link>
              </li>
            ))}
          </ul>
        )}
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
            <p>{c.body}</p>
            <p>
              {c.author.username} {new Date(c.createdAt).toLocaleDateString()}
            </p>
            {c.author._id === user._id && <button>Edit Comment</button>}
            {(c.author._id === user._id || post.author._id === user._id) && (
              <button onClick={() => handleDeleteComment(c._id)}>
                Delete Comment
              </button>
            )}
          </article>
        ))}
        <CommentForm handleAddComment={handleAddComment} />
      </section>
    </main>
  );
};

export default PostDetails;
