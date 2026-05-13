import { useState } from "react";
import { deleteComment, updateComment } from "../../services/commentService";

const CommentItem = ({ comment, postId, user, setComments, postOwnerId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(comment.body);

  const handleUpdate = async () => {
    try {
      const updatedComment = await updateComment(postId, comment._id, {
        body: editBody,
      });
      setComments((prev) =>
        prev.map((c) => (c._id === comment._id ? updatedComment : c)),
      );
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(postId, comment._id);
      setComments((prev) => prev.filter((c) => c._id !== comment._id));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  return (
    <li className="card bg-brand-mutedp text-white shadow-md mb-4">
      <div className="card-body p-5">
        <header className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="avatar placeholder">
              <div className="bg-brand-lightp text-brand-darkp w-8 rounded-full">
                <span className="text-xs font-bold">
                  {comment.author?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <strong className="text-white font-semibold">
              {comment.author?.username}
            </strong>
          </div>
          <span className="text-xs opacity-80">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </header>

        {isEditing ? (
          <div className="flex flex-col gap-3">
            <textarea
              className="textarea textarea-bordered w-full bg-white text-black focus:outline-brand-lightp"
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <div className="card-actions justify-end">
              <button
                onClick={handleUpdate}
                className="btn btn-sm bg-brand-lightp text-brand-darkp border-none hover:bg-white"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-sm btn-ghost text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm leading-relaxed">{comment.body}</p>
            <div className="card-actions justify-end mt-2">
              {comment.author?._id === user?._id && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-xs btn-ghost text-brand-lightp hover:bg-brand-lightp/20"
                >
                  Edit
                </button>
              )}
              {(comment.author?._id === user?._id ||
                postOwnerId === user?._id) && (
                <button
                  onClick={handleDelete}
                  className="btn btn-xs btn-ghost text-red-300 hover:bg-red-500 hover:text-white"
                >
                  Delete
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </li>
  );
};

export default CommentItem;
