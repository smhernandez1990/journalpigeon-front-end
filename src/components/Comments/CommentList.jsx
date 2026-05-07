import CommentItem from "./CommentItem";

const CommentList = ({ comments, postId, user, setComments, postOwnerId }) => {
  if (!comments || comments.length === 0) return <p>No comments yet.</p>;

  return (
    <ul>
      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          postId={postId}
          user={user}
          setComments={setComments}
          postOwnerId={postOwnerId}
        />
      ))}
    </ul>
  );
};


export default CommentList;
