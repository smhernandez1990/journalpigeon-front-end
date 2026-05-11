import { useContext, useState } from "react";
import { useParams } from "react-router";
import * as commentService from "../../services/commentService";
import { UserContext } from "../../contexts/UserContext";

const CommentForm = () => {
  const { postId } = useParams();
  const { user } = useContext(UserContext);
  const [commentFormData, setCommentFormData] = useState({ body: "" });
  const [comments, setComments] = useState([])
  // const [isEditing, setIsEditing] = useState(false);
  // const [editBody, setEditBody] = useState(comment.body);

  const handleAddComment = async (formData) => {
    try {
      const newComment = await commentService.createComment(postId, formData);
      // Use the setComments prop passed from PostDetails to update the UI
      setComments((prev) => [newComment, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  // const handleUpdateComment = async () => {
  //     try {
  //       const updatedComment = await commentService.updateComment(postId, comment._id, {
  //         body: editBody,
  //       });
  //       setComments((prev) =>
  //         prev.map((c) => (c._id === comment._id ? updatedComment : c)),
  //       );
  //       setIsEditing(false);
  //     } catch (err) {
  //       console.error("Error updating comment:", err);
  //     }
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;
    handleAddComment(commentFormData);
    setCommentFormData({ body: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment">Add a Comment:</label>
      <textarea
        name="body"
        id="comment"
        value={commentFormData.body}
        onChange={(e) => setCommentFormData({ body: e.target.value })}
        required
      />
      <button type="submit">Comment!</button>
    </form>
  );
};

export default CommentForm;