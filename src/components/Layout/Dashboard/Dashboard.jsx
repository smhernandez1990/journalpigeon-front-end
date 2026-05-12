<<<<<<< HEAD
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import { Link, useNavigate } from 'react-router'
import * as postService from '../../../services/postService'

const Dashboard = () => {
    
    const { user } = useContext(UserContext)
    const [myLoadedPosts, setMyLoadedPosts] = useState(5)
    const [latestLoadedPosts, setLatestLoadedPosts] = useState(5)
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    const filteredUserPosts = posts.filter((p) => p.author._id === user._id)

    useEffect(() => {
        const fetchAllPosts = async () => {
            const postsData = await postService.index()
                setPosts(postsData)
        }
        if (user) fetchAllPosts()
    }, [user])
    
    if (!posts) return <main>Loading...</main>
  return (
    <div>
        <section>
        <h1>Welcome Back, {user.username}</h1>
        <h2>Your Latest Posts</h2>
            {filteredUserPosts.length === 0 && <p><button onClick={() => navigate('/posts/new')}>Make Your First Post!</button></p>}
            {filteredUserPosts.slice(0, myLoadedPosts).map((p) => (
                <article key={p._id}>
                    <p>
                        <Link to={`/posts/${p._id}`}>
                            <strong>{p.title}</strong>
                        </Link>
                    </p>
                </article>
            ))}
            {(myLoadedPosts < filteredUserPosts.length && myLoadedPosts < 10) && (
                  <button onClick={() => setMyLoadedPosts((prev) => prev + 5)}>Load More Posts</button>
            )}
            {(myLoadedPosts < filteredUserPosts.length && myLoadedPosts >= 10) &&
                <button onClick={() => navigate(`/${user.username}`)}>All My Posts</button>
            }
        </section>
        <section>
            <h3>Latest From The Flock</h3>
                {posts.slice(0, latestLoadedPosts).map((p) => (
                    <article key={p._id}>
                        <p>
                            <Link to={`/posts/${p._id}`}>
                                <strong>{p.title}</strong>
                            </Link>
                            {' '} by {' '}
                            <Link to={`/${p.author.username}`}>{p.author.username}</Link>
                        </p>
                    </article>
                ))}
                {(latestLoadedPosts < posts.length && latestLoadedPosts < 10) 
                    && 
                    <button onClick={() => setLatestLoadedPosts((prev) => prev + 5)}>Load More Posts</button>
                }
                {(latestLoadedPosts < posts.length && latestLoadedPosts >= 10)
                    && 
                  <button onClick={() => navigate('/posts')}>Explore All Latest</button>
                }    
            <h3>Subscribed</h3>
            <p>Feature Coming Soon!</p>
        </section>
    </div>
  )
}
=======
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import * as userService from "../../../services/userService";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
>>>>>>> ed6ba5f968eb09b77270fac97348bc61843209af

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await userService.index();
        setUsers(allUsers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-brand-darkp">
        Welcome Back, {user.username}
      </h1>
      <p className="mb-8 text-text italic">
        Discover other pigeons in the flock:
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((u) => (
          <div
            key={u._id}
            className="card bg-brand-mutedp text-white shadow-md transition-transform hover:scale-105"
          >
            <div className="card-body flex-row items-center gap-4 p-6">
              <div className="avatar placeholder">
                <div className="bg-brand-lightp text-brand-darkp w-12 rounded-full">
                  <span className="text-lg font-bold">
                    {u.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div>
                <h2 className="card-title">{u.username}</h2>
                <p className="text-xs opacity-80 uppercase tracking-widest font-semibold">
                  Flock Member
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Dashboard;
