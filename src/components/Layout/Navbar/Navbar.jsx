import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Link } from "react-router";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="navbar bg-brand-mutedp text-white px-4 md:px-8 shadow-lg">
      <div className="flex-1">
        <Link
          to="/"
          className="text-xl font-black tracking-tighter hover:text-brand-lightp transition-colors"
        >
          JOURNAL PIGEON
        </Link>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">
          {user ? (
            <>
              <li>
                <Link
                  to="/"
                  className="hover:bg-brand-lightp hover:text-brand-darkp"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/posts"
                  className="hover:bg-brand-lightp hover:text-brand-darkp"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  to="/posts/new"
                  className="hover:bg-brand-lightp hover:text-brand-darkp"
                >
                  Add Post
                </Link>
              </li>
              <div className="divider divider-horizontal bg-white/20 mx-0 w-[1px]"></div>
              <li className="flex flex-row items-center gap-2">
                <Link
                  to={`/posts/user/${user.username}`}
                  className="text-brand-lightp hidden sm:inline hover:underline underline-offset-4"
                >
                  @{user.username}
                </Link>
                <Link
                  to="/"
                  onClick={handleLogOut}
                  className="btn btn-sm btn-ghost bg-brand-lightp text-brand-darkp hover:bg-white hover:text-brand-darkp border-none"
                >
                  Sign Out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/"
                  className="hover:bg-brand-lightp hover:text-brand-darkp"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/sign-up"
                  className="hover:bg-brand-lightp hover:text-brand-darkp"
                >
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
