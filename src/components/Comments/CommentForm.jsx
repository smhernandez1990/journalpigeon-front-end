import { useState } from "react";
import { createComment } from "../services/commentService";

const CommentForm = ({ postId, setComments }) => {

  const [formData, setFormData] = useState({ body: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = await createComment(postId, formData);

      setComments((prev) => [newComment, ...prev]);
      setFormData({ body: "" });
    } catch (err) {
      console.log("Error creating comment:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment">Add a Comment:</label>
      <textarea
        name="body" 
        id="comment"
        value={formData.body}
        onChange={(e) => setFormData({ body: e.target.value })}
        required
      />
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default CommentForm;
