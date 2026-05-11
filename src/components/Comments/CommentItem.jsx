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
    <li>
      <header>
        <strong>{comment.author?.username}</strong> on{" "}
        {new Date(comment.createdAt).toLocaleDateString()}
      </header>
      {isEditing ? (
        <div>
          <textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <p>{comment.body}</p>
          <div className="actions">
            {comment.author?._id === user?._id && (
              <button onClick={() => setIsEditing(true)}>Edit</button>
            )}
            {(comment.author?._id === user?._id ||
              postOwnerId === user?._id) && (
                <button onClick={handleDelete}>Delete</button>
              )}
          </div>
        </>
      )}
    </li>
  );
};

export default CommentItem;