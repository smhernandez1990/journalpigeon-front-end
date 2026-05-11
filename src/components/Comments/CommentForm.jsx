import { useState } from "react";

const CommentForm = (props) => {
  const [commentFormData, setCommentFormData] = useState({ body: "" });

  const handleChange = (e) => {
    setCommentFormData({ ...commentFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleAddComment(commentFormData);
    setCommentFormData({ body: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="body">Add a Comment:</label>
      <textarea
        required
        name="body"
        id="body"
        value={commentFormData.body}
        onChange={handleChange}
      />
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default CommentForm;
