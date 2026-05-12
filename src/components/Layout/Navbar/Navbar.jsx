import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Link } from "react-router";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogOut = () => {
<<<<<<< HEAD
    localStorage.removeItem('token')
    setUser(null)
  }
  return (
    <nav>
      <ul>
        {user ? (
          <>
            <li>
              {user.username}
              {' '}
              <Link to='/'>Dashboard</Link>
              {' '}
              <Link to='/posts/new'>Add Post</Link>
              {' '}
              <Link to='/posts'>Explore</Link>
              {' '}
              <Link to='/sign-in' onClick={handleLogOut}>Sign Out</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/'>Home</Link>
              {' '}
              <Link to='/sign-up'>Sign Up</Link>
              {' '}
              <Link to='/sign-in'>Sign In</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
=======
    localStorage.removeItem("token");
    setUser(null);
  };
>>>>>>> ed6ba5f968eb09b77270fac97348bc61843209af

  return (
    <div className="navbar bg-brand-primaryp text-white px-4 md:px-8 shadow-lg">
      <div className="flex-1">
        <Link
          to="/"
          className="text-xl font-black tracking-tighter hover:text-brand-lightp transition-colors"
        >
          FLOCK
        </Link>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">
          {user ? (
            <>
              <li>
                <Link to="/" className="hover:bg-brand-darkp">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:bg-brand-darkp">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/posts/new" className="hover:bg-brand-darkp">
                  Add Post
                </Link>
              </li>
              <div className="divider divider-horizontal border-white/20 mx-0"></div>
              <li className="flex flex-row items-center gap-2">
                <span className="text-brand-lightp hidden sm:inline">
                  @{user.username}
                </span>
                <Link
                  to="/sign-in"
                  onClick={handleLogOut}
                  className="btn btn-sm btn-ghost bg-brand-darkp hover:bg-white hover:text-brand-darkp border-none"
                >
                  Sign Out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="hover:bg-brand-darkp">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sign-up" className="hover:bg-brand-darkp">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  to="/sign-in"
                  className="btn btn-sm bg-brand-lightp text-brand-darkp border-none hover:bg-white"
                >
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
