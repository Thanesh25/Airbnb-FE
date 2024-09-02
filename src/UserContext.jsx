import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
useEffect(() => {
  const token = localStorage.getItem("token"); // Retrieve token from local storage or state

  if (token && !user) {
    axios
      .get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      })
      .then(({data}) => {setUser(data.userDoc);
        setReady(true);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setReady(true);
      });
  } else {
    setReady(true);
  }
}, [user]);
  return (
    <UserContext.Provider value={{ user, setUser, ready, setReady }}>
      {children}
    </UserContext.Provider>
  );
}
