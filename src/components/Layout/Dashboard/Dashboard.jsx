import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import * as userService from "../../../services/userService";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);

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
