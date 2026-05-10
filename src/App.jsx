import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar/Navbar";
import SignUpForm from "./components/Auth/SignUpForm/SignUpForm";
import SignInForm from "./components/Auth/SignInForm/SignInForm";
import PostForm from "./components/Posts/PostForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Layout/Dashboard/Dashboard";
import ExplorePage from "./components/Layout/ExplorePage/ExplorePage";
import PostDetails from "./components/Posts/PostDetails";
import PostList from "./components/Posts/PostList";

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/posts/new" element={<PostForm />} />
            <Route path="/posts/:postId" element={<PostDetails />} />
            <Route path="/posts/:postId/edit" element={<PostForm />} />
            <Route
              path="/user/:username"
              element={<PostList type="selectedUser" />}
            />
            <Route
              path="/posts/tagged/:tag"
              element={<PostList type="tag" />}
            />
          </>
        ) : (
          <>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
