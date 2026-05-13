import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import * as postService from "../../services/postService";
import { UserContext } from "../../contexts/UserContext";
import { errNotify } from "../ErrorNotification/ErrorNotification";

const initState = {
  title: "",
  mood: "",
  body: "",
  tags: [],
};

const PostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
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
      } catch (error) {
        errNotify(error);
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
      .replace(/[^a-zA-Z0-9 ,]/g, "")
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const postData = { ...formData, tags: processedTags };

    try {
      if (postId) {
        await postService.update(postId, postData);
      } else {
        await postService.create(postData);
      }
      navigate(`/posts/user/${user.username}`);
    } catch (error) {
      errNotify(error);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-10 min-h-screen">
      <div className="card bg-brand-mutedp shadow-xl p-8 rounded-3xl text-white">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">
            {postId ? "Edit Post" : "New Post"}
          </h1>
          <div className="h-1.5 w-12 bg-brand-lightp rounded-full mx-auto"></div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label" htmlFor="title">
              <span className="label-text font-bold text-white">Title</span>
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-black focus:outline-brand-lightp"
              required
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="mood">
              <span className="label-text font-bold text-white">Mood</span>
            </label>
            <input
              id="mood"
              name="mood"
              value={formData.mood}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-black focus:outline-brand-lightp"
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="body">
              <span className="label-text font-bold text-white">Body</span>
            </label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="input input-bordered w-full h-64 py-3 bg-white text-black focus:outline-brand-lightp resize-none"
              required
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="tags">
              <span className="label-text font-bold text-white">Tags</span>
            </label>
            <input
              id="tags"
              name="tags"
              value={tagVals}
              onChange={(e) => setTagVals(e.target.value)}
              className="input input-bordered w-full bg-white text-black focus:outline-brand-lightp"
              placeholder="coding, react, help"
            />
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              type="submit"
              className="btn bg-brand-lightp text-brand-darkp border-none font-bold hover:bg-white transition-colors"
            >
              {postId ? "Update Post" : "Create Post"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-ghost text-white hover:bg-brand-lightp/20"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default PostForm;
