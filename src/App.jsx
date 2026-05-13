import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { Routes, Route } from "react-router";
import { ToastContainer } from 'react-toastify'
import Navbar from "./components/Layout/Navbar/Navbar";
import SignUpForm from "./components/Auth/SignUpForm/SignUpForm";
import SignInForm from "./components/Auth/SignInForm/SignInForm";
import PostForm from "./components/Posts/PostForm";
import Landing from "./components/Layout/Landing/Landing";
import Dashboard from "./components/Layout/Dashboard/Dashboard";
import ExplorePage from "./components/Layout/ExplorePage/ExplorePage";
import PostDetails from "./components/Posts/PostDetails";
import PostList from "./components/Posts/PostList";
import Footer from "./components/Layout/Footer/Footer";
import ErrorPage from "./components/Layout/ErrorPage/ErrorPage";


const App = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <ToastContainer
        position='top-right'
        autoClose={7500}
        pauseOnHover
      />
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path='/posts' element={<ExplorePage />} /> //explore shows all posts from all users from newest to oldest
            <Route path='/posts/new' element={<PostForm />} />
            <Route path='/posts/:postId' element={<PostDetails />} />
            <Route path='/posts/:postId/edit' element={<PostForm />} />
            <Route path='//posts/user/:username' element={<PostList type='selectedUser' />} />
            <Route path='/posts/tagged/:tag' element={<PostList type='tagged' />} />
          </>
        ) : (
          <>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;