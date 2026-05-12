import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import * as postService from "../../services/postService";

const initState = {
  title: "",
  mood: "",
  body: "",
  tags: [],
};

const PostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [tagVals, setTagVals] = useState("");
  const [formData, setFormData] = useState(initState);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await postService.show(postId);
        setFormData({
          title: postData.title || "",
          mood: postData.mood || "",
          body: postData.body || "",
          tags: postData.tags || [],
        });
        setTagVals(postData.tags ? postData.tags.join(", ") : "");
      } catch (err) {
        console.error(err);
      }
    };
    if (postId) fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const processedTags = tagVals
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const postData = { ...formData, tags: processedTags };

    try {
      if (postId) {
        await postService.update(postId, postData);
        navigate(`/posts/${postId}`);
      } else {
        await postService.create(postData);
        navigate("/posts");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <h1>{postId ? "Edit Post" : "New Post"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="mood">Mood</label>
        <input
          id="mood"
          name="mood"
          value={formData.mood}
          onChange={handleChange}
        />
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          required
        />
        <label htmlFor="tags">Tags (comma separated)</label>
        <input
          id="tags"
          name="tags"
          value={tagVals}
          onChange={(e) => setTagVals(e.target.value)}
          placeholder="coding, react, help"
        />
        <button type="submit">{postId ? "Update Post" : "Create Post"}</button>
      </form>
    </main>
  );
};

export default PostForm;
