import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Link, useNavigate } from "react-router";
import * as postService from "../../../services/postService";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [myLoadedPosts, setMyLoadedPosts] = useState(5);
  const [latestLoadedPosts, setLatestLoadedPosts] = useState(5);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const filteredUserPosts = posts.filter((p) => p.author._id === user._id);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const postsData = await postService.index();
        setPosts(postsData);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchAllPosts();
  }, [user]);

  if (!posts || posts.length === 0) {
    return (
      <main className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-brand-mutedp"></span>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-12">
      <section>
        <h1 className="text-3xl font-bold mb-4 text-brand-darkp">
          Welcome Back, {user.username}
        </h1>
        <h2 className="text-xl font-bold mb-6 text-text italic">
          Your Latest Posts
        </h2>

        {filteredUserPosts.length === 0 && (
          <div className="text-center py-8 bg-white rounded-3xl border border-dashed border-brand-mutedp">
            <button
              onClick={() => navigate("/posts/new")}
              className="btn bg-brand-mutedp text-white border-none hover:bg-brand-darkp"
            >
              Make Your First Post!
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUserPosts.slice(0, myLoadedPosts).map((p) => (
            <article
              key={p._id}
              className="card bg-brand-mutedp text-white shadow-md transition-transform hover:scale-105"
            >
              <div className="card-body p-6">
                <Link to={`/posts/${p._id}`}>
                  <h2 className="card-title text-xl hover:underline">
                    {p.title}
                  </h2>
                </Link>
                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/posts/${p._id}`}
                    className="btn bg-brand-lightp text-brand-darkp border-none btn-sm hover:bg-white"
                  >
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          {myLoadedPosts < filteredUserPosts.length && myLoadedPosts < 10 && (
            <button
              onClick={() => setMyLoadedPosts((prev) => prev + 5)}
              className="btn btn-ghost text-brand-mutedp font-bold"
            >
              Load More Posts
            </button>
          )}
          {myLoadedPosts < filteredUserPosts.length && myLoadedPosts >= 10 && (
            <button
              onClick={() => navigate(`/posts/user/${user.username}`)}
              className="btn btn-outline border-brand-mutedp text-brand-mutedp hover:bg-brand-mutedp hover:text-white"
            >
              All My Posts
            </button>
          )}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-6 text-brand-darkp">
          Latest From The Flock
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.slice(0, latestLoadedPosts).map((p) => (
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
                    to={`/posts/user/${p.author.username}`}
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

        <div className="mt-6 flex justify-center">
          {latestLoadedPosts < posts.length && latestLoadedPosts < 10 && (
            <button
              onClick={() => setLatestLoadedPosts((prev) => prev + 5)}
              className="btn btn-ghost text-brand-mutedp font-bold"
            >
              Load More Posts
            </button>
          )}
          {latestLoadedPosts < posts.length && latestLoadedPosts >= 10 && (
            <button
              onClick={() => navigate("/posts")}
              className="btn btn-outline border-brand-mutedp text-brand-mutedp hover:bg-brand-mutedp hover:text-white"
            >
              Explore All Latest
            </button>
          )}
        </div>
      </section>

      <section className="bg-white p-8 rounded-3xl border border-border">
        <h3 className="text-2xl font-bold text-brand-darkp mb-2">Subscribed</h3>
        <p className="text-text italic">Feature Coming Soon!</p>
      </section>
    </main>
  );
};

export default Dashboard;
