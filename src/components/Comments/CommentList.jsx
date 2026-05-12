import CommentItem from "./CommentItem";

const CommentList = ({ comments, postId, user, setComments, postOwnerId }) => {
  if (!comments || comments.length === 0) {
    return (
      <p className="py-4 text-center text-brand-darkp italic font-medium">
        No comments yet.
      </p>
    );
  }

  return (
    <ul className="mt-8 space-y-4 border-t-2 border-brand-mutedp pt-6">
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
