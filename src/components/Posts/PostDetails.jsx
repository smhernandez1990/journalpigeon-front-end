import { useParams, useNavigate, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import * as postService from "../../services/postService";
import * as commentService from "../../services/commentService";
import CommentForm from "../Comments/CommentForm";
import { UserContext } from "../../contexts/UserContext";
import { errNotify } from "../ErrorNotification/ErrorNotification";

const PostDetails = () => {
  const { postId } = useParams();
  const { user } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();



  const handleDeletePost = async (postId) => {
    try {
      await postService.deletePost(postId);
      navigate(`/${user.username}`);
    } catch (error) {
      errNotify()
    }
  };

  const handleAddComment = async (commentFormData) => {
    try {
      const newComment = await commentService.createComment(postId, commentFormData);
      setPost({
        ...post,
        comments: [...post.comments, newComment],
      });
    } catch (error) {
      errNotify()
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentService.deleteComment(postId, commentId);
      setPost({
        ...post,
        comments: post.comments.filter((c) => c._id !== commentId),
      });
    } catch (error) {
      errNotify()
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await postService.show(postId);
        setPost(postData);
      } catch (error) {
        errNotify()
      } finally {
        setIsLoading(false)
      }
    };
    fetchPost();
  }, [postId]);

  if (isLoading) return <main>Loading...</main>;
  if (!post) navigate('/error')
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
        {post.tags?.length > 0 && (
          <ul className="showPostTags">
            Tagged:{" "}
            {post.tags.map((t) => (
              <li key={t}>
                <Link to={`/posts/tagged/${t}`}>{t}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {post.author?._id === user?._id && (
        <>
          <Link to={`/posts/${postId}/edit`}>
            <button>Edit Post</button>
          </Link>
          <button onClick={() => handleDeletePost(postId)}>Delete Post</button>
        </>
      )}

      <section>
        <h3>Comments</h3>
        {!post.comments?.length && <p>No Comments Yet!</p>}
        {post.comments?.map((c) => (
          <article key={c._id}>
            <p>{c.body}</p>
            <p>
              {c.author?.username} {new Date(c.createdAt).toLocaleDateString()}
            </p>
            {c.author?._id === user?._id && <button>Edit Comment</button>}
            {(c.author?._id === user?._id ||
              post.author?._id === user?._id) && (
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
