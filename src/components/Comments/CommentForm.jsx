import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import * as commentService from "../../services/commentService";
import { UserContext } from "../../contexts/UserContext";

const CommentForm = ({ setComments }) => {
  const { postId } = useParams();
  const { user } = useContext(UserContext);
  const [commentFormData, setCommentFormData] = useState({ body: "" });

  const handleAddComment = async (formData) => {
    try {
      const newComment = await commentService.createComment(postId, formData);
      // Use the setComments prop passed from PostDetails to update the UI
      setComments((prev) => [newComment, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

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
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default CommentForm;
