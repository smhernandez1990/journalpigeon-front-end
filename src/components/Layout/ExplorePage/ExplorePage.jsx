import { Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import * as postService from "../../../services/postService";
import { UserContext } from "../../../contexts/UserContext";

const ExplorePage = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const postsData = await postService.index();
      setPosts(postsData);
    };
    if (user) fetchAllPosts();
  }, [user]);

  if (!posts) {
    return (
      <main className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-brand-darkp">
        Explore Posts
      </h1>
      <p className="mb-8 text-text italic">
        Read what the flock is chirping about:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((p) => (
          <article
            key={p._id}
            className="card bg-brand-mutedp text-white shadow-md transition-transform hover:scale-105"
          >
            <div className="card-body p-6">
              <Link to={`/posts/${p._id}`}>
                <h2 className="card-title text-xl mb-2 hover:underline">
                  {p.title}
                </h2>
              </Link>

              <div className="flex items-center gap-2 text-sm opacity-90">
                <span>by</span>
                <Link
                  to={`/${p.author.username}`}
                  className="font-bold hover:text-brand-lightp transition-colors"
                >
                  @{p.author.username}
                </Link>
              </div>

              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/posts/${p._id}`}
                  className="btn bg-brand-lightp text-brand-darkp border-none btn-sm hover:bg-white"
                >
                  Read Post
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default ExplorePage;
