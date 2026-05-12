import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../../../services/authService";
import { UserContext } from "../../../contexts/UserContext";

const SignInForm = ({ toast }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserContext);
  const { username, password } = formData;

  const handleChange = (e) => {
    setMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signIn(formData);
      setUser(user);
      navigate("/");
    } catch (error) {
      toast.error("Error: ", error.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password);
  };

  return (
    <main className="max-w-md mx-auto px-6 py-20 bg-bg min-h-screen">
      <div className="card bg-brand-mutedp shadow-xl p-8 rounded-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Sign In</h1>
          <div className="h-1.5 w-12 bg-brand-lightp rounded-full mx-auto"></div>
          {message && (
            <p className="mt-4 text-brand-lightp italic">{message}</p>
          )}
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label" htmlFor="username">
              <span className="label-text font-bold text-white">Username</span>
            </label>
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-black focus:outline-brand-lightp"
              required
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text font-bold text-white">Password</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-black focus:outline-brand-lightp"
              required
            />
          </div>

          <div className="pt-4 space-y-3">
            <button
              disabled={isFormInvalid()}
              className="btn bg-brand-lightp text-brand-darkp border-none w-full font-bold hover:bg-white disabled:bg-opacity-50"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn btn-ghost w-full text-white hover:bg-brand-lightp/20"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignInForm;
