import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import * as postService from "../../services/postService";
import { UserContext } from "../../contexts/UserContext";
import { errNotify } from "../ErrorNotification/ErrorNotification";

const PostList = ({ type }) => {
  const { user } = useContext(UserContext);
  const { username, tag } = useParams();
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const postsData = await postService.index();
        setAllPosts(postsData || []);
      } catch (error) {
        errNotify(error)
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchAllPosts();
  }, [user]);

  if (isLoading) {
    return (
      <main className="flex justify-center items-center min-h-screen bg-bg">
        <span className="loading loading-spinner loading-lg text-brand-mutedp"></span>
      </main>
    );
  }

  const filteredPosts =
    type === "selectedUser"
      ? allPosts.filter((p) => p.author?.username === username)
      : allPosts.filter((p) => p.tags?.some((tg) => tg === tag));

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 bg-bg min-h-screen">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-brand-darkp mb-2">
          {type === "selectedUser"
            ? `${username}'s Posts`
            : `Posts Tagged '${tag}'`}
        </h1>
        <div className="h-1.5 w-16 bg-brand-lightp rounded-full mx-auto mb-6"></div>
        <Link to="/posts">
          <button className="btn btn-ghost btn-sm text-brand-mutedp hover:bg-brand-lightp/20">
            ← Back to Explore
          </button>
        </Link>
      </header>

      <section className="space-y-4">
        {filteredPosts.map((p) => (
          <article
            key={p._id}
            className="card bg-brand-mutedp text-white shadow-md hover:scale-[1.02] transition-transform p-5 rounded-2xl"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <Link
                to={`/posts/${p._id}`}
                className="text-lg font-bold hover:underline"
              >
                {p.title}
              </Link>
              {type !== "selectedUser" && (
                <span className="text-sm opacity-90">
                  by{" "}
                  <Link
                    to={`/posts/user/${p.author?.username}`}
                    className="font-bold hover:text-brand-lightp transition-colors"
                  >
                    @{p.author?.username}
                  </Link>
                </span>
              )}
            </div>
          </article>
        ))}
        {!filteredPosts.length && (
          <p className="py-12 text-center text-brand-darkp italic bg-white rounded-3xl border border-dashed border-brand-mutedp">
            No Posts Found.
          </p>
        )}
      </section>
    </main>
  );
};

export default PostList;
