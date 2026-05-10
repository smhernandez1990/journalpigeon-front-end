import { useParams, Link } from "react-router-dom";
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
      ? allPosts.filter((p) => p.author?.username === username)
      : allPosts.filter((p) => p.tags?.includes(tag));

  return (
    <main>
      <h1>Posts By {type === "selectedUser" ? username : tag}</h1>
      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        filteredPosts.map((p) => (
          <article key={p._id}>
            <p>
              <Link to={`/posts/${p._id}`}>
                <strong>{p.title}</strong>
              </Link>
            </p>
            {type === "tag" && (
              <p>
                by{" "}
                <Link to={`/${p.author?.username}`}>{p.author?.username}</Link>
              </p>
            )}
          </article>
        ))
      )}
    </main>
  );
};

export default PostList;
