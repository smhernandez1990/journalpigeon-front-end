import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import * as postService from "../../services/postService";
import CommentForm from "../Comments/CommentForm";
import CommentList from "../Comments/CommentList";
import { UserContext } from "../../contexts/UserContext";

const PostDetails = () => {
  const { postId } = useParams();
  const { user } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const handleDeletePost = async (id) => {
    try {
      await postService.deletePost(id);
      navigate("/posts");
    } catch (err) {
      console.error(err);
    }
  };

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

  const setComments = (updateFn) => {
    setPost((prev) => ({
      ...prev,
      comments:
        typeof updateFn === "function" ? updateFn(prev.comments) : updateFn,
    }));
  };

  if (!post) return <main>Loading...</main>;

  return (
    <main>
      <section>
        <header>
          <h1>{post.title}</h1>
          <h2>{`${post.author?.username} posted this on ${new Date(post.createdAt).toLocaleDateString()}`}</h2>
        </header>
        <p>{post.body}</p>
        <ul className="showPostTags">
          Tagged:
          {post.tags?.map((t) => (
            <li key={t}>
              <Link to={`/posts?tag=${t}`}>{t}</Link>
            </li>
          ))}
        </ul>
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
        <CommentList
          comments={post.comments}
          postId={postId}
          user={user}
          setComments={setComments}
          postOwnerId={post.author?._id}
        />
        <CommentForm setComments={setComments} />
      </section>
    </main>
  );
};

export default PostDetails;
