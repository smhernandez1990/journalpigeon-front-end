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
      navigate(`/posts/user/${user.username}`);
    } catch (error) {
      errNotify(error);
    }
  };

  const handleAddComment = async (commentFormData) => {
    try {
      const newComment = await commentService.createComment(
        postId,
        commentFormData,
      );
      setPost({
        ...post,
        comments: [...post.comments, newComment],
      });
    } catch (error) {
      errNotify(error);
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
      errNotify(error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await postService.show(postId);
        setPost(postData);
      } catch (error) {
        errNotify(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  if (isLoading) {
    return (
      <main className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-brand-mutedp"></span>
      </main>
    );
  }

  if (!post) navigate('/error')

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <article className="card bg-brand-mutedp text-white shadow-xl">
        <div className="card-body p-8">
          <header className="mb-6">
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <div className="flex items-center gap-2 text-brand-lightp font-medium">
              <span>by</span>
              <Link
                to={`/posts/user/${post.author.username}`}
                className="hover:underline"
              >
                @{post.author.username}
              </Link>
              <span className="text-white/60">•</span>
              <span className="text-white/80">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          </header>

          <p className="text-lg leading-relaxed mb-8">{post.body}</p>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((t) => (
                <Link
                  key={t}
                  to={`/posts/tagged/${t}`}
                  className="badge bg-brand-lightp text-brand-darkp border-none p-3 font-semibold hover:bg-white transition-colors"
                >
                  #{t}
                </Link>
              ))}
            </div>
          )}

          {post.author._id === user._id && (
            <div className="card-actions justify-end border-t border-white/20 pt-4 gap-2">
              <Link
                to={`/posts/${postId}/edit`}
                className="btn btn-sm bg-brand-lightp text-brand-darkp border-none hover:bg-white"
              >
                Edit Post
              </Link>
              <button
                onClick={() => handleDeletePost(postId)}
                className="btn btn-sm btn-outline text-white hover:bg-red-500 hover:border-red-500"
              >
                Delete Post
              </button>
            </div>
          )}
        </div>
      </article>

      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-brand-darkp">Comments</h3>

        <div className="space-y-4">
          {!post.comments.length && (
            <p className="text-text italic py-4">
              No comments yet. Be the first to chirp!
            </p>
          )}
          {post.comments.map((c) => (
            <article
              key={c._id}
              className="card bg-brand-mutedp text-white shadow-md"
            >
              <div className="card-body p-5">
                <header className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="avatar placeholder">
                      <div className="bg-brand-lightp text-brand-darkp w-8 rounded-full">
                        <span className="text-xs font-bold">
                          {c.author.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <strong className="font-semibold">
                      @{c.author.username}
                    </strong>
                  </div>
                  <span className="text-xs opacity-70">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </header>

                <p className="text-sm leading-relaxed">{c.body}</p>

                {(c.author._id === user._id ||
                  post.author._id === user._id) && (
                  <div className="card-actions justify-end mt-2">
                    <button
                      onClick={() => handleDeleteComment(c._id)}
                      className="btn btn-xs btn-ghost text-red-300 hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="pt-4">
          <CommentForm handleAddComment={handleAddComment} />
        </div>
      </section>
    </main>
  );
};

export default PostDetails;
