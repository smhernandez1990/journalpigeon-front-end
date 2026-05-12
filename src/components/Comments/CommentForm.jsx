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
    <form
      onSubmit={handleSubmit}
      className="card bg-brand-mutedp text-white shadow-md p-6 mt-8"
    >
      <label
        htmlFor="body"
        className="block text-sm font-semibold uppercase tracking-widest mb-2"
      >
        Add a Comment:
      </label>
      <textarea
        required
        name="body"
        id="body"
        value={commentFormData.body}
        onChange={handleChange}
        className="textarea textarea-bordered bg-white text-brand-darkp w-full focus:outline-brand-lightp"
        placeholder="Type your message..."
      />
      <div className="card-actions justify-end mt-4">
        <button
          type="submit"
          className="btn bg-brand-lightp text-brand-darkp border-none hover:bg-white transition-colors"
        >
          Submit Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
