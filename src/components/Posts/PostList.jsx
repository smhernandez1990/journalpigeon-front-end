import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import * as postService from "../../services/postService";
import { UserContext } from "../../contexts/UserContext";

const PostList = ({ type }) => {
  const { user } = useContext(UserContext);
  const { username, tag } = useParams();
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const postsData = await postService.index();
        setAllPosts(postsData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchAllPosts();
  }, [user]);

  if (isLoading) return <main>Loading...</main>;

  const filteredPosts =
    type === "selectedUser"
      ? allPosts.filter((p) => p.author.username === username)
      : allPosts.filter((p) => p.tags.some((tg) => tg === tag));

  return (
    <main>
      <h1>
        {type === "selectedUser"
          ? `${username}'s Posts`
          : `Posts Tagged '${tag}'`}
      </h1>

      <Link to="/explore">
        <button>← Back to Explore</button>
      </Link>

      <section>
        {filteredPosts.map((p) => (
          <article key={p._id}>
            <p>
              <Link to={`/posts/${p._id}`}>
                <strong>{p.title}</strong>
              </Link>
              {type !== "selectedUser" && (
                <>
                  {" by "}
                  <Link to={`/posts/author/${p.author.username}`}>
                    {p.author.username}
                  </Link>
                </>
              )}
            </p>
          </article>
        ))}
        {!filteredPosts.length && <p>No Posts Found.</p>}
      </section>
    </main>
  );
};

export default PostList;
