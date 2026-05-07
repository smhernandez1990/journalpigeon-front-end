const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/posts`;

export const createComment = async (postId, commentData) => {
  const response = await fetch(`${BASE_URL}/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(commentData),
  });
  if (!response.ok) throw new Error("Failed to create comment");
  return response.json();
};


export const updateComment = async (postId, commentId, commentData) => {
  const response = await fetch(`${BASE_URL}/${postId}/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(commentData),
  });
  if (!response.ok) throw new Error("Failed to update comment");
  return response.json();
};

export const deleteComment = async (postId, commentId) => {
  const response = await fetch(`${BASE_URL}/${postId}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) throw new Error("Failed to delete comment");
  return true;
};
