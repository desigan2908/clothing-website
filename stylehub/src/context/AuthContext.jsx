import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedUser")) || null
  );

  const login = (email, password, remember) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!existingUser) {
      return false;
    }

    setUser(existingUser);

    if (remember) {
      localStorage.setItem(
        "loggedUser",
        JSON.stringify(existingUser)
      );
    }

    return true;
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push(userData);

    localStorage.setItem("users", JSON.stringify(users));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
  };



const updateProfile = (updatedUser) => {
  setUser(updatedUser);
  localStorage.setItem(
    "loggedUser",
    JSON.stringify(updatedUser)
  );

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const updatedUsers = users.map((u) =>
    u.email === updatedUser.email ? updatedUser : u
  );

  localStorage.setItem(
    "users",
    JSON.stringify(updatedUsers)
  );
};


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);