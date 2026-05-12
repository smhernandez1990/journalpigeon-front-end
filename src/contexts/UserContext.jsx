import { createContext, useState } from "react";

const UserContext = createContext();

const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = token.split(".");
    return JSON.parse(atob(payload[1])).user;
  } catch {
    return null;
  }
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromToken());

  const value = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
