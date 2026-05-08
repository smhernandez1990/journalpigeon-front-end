import { useContext, useState } from "react";
import { useParams } from 'react-router'
import * as commentService from "../../services/commentService";
import { UserContext } from "../../contexts/UserContext";

const CommentForm = () => {

  const { postId } = useParams()
  const { user } = useContext(UserContext)
  const [comment, setComment] = useState(null)
  const [commentFormData, setCommentFormData] = useState({ body: "" });
  
  const handleAddComment = async (commentFormData) => {
      const newComment = await commentService.createComment(postId, commentFormData);
      setComment((prev) => prev, newComment);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!user) throw new Error('You Must Be Signed In To Comment')
    handleAddComment()
    setCommentFormData({ body: '' })
  }

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
