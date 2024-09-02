import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Navigate, useParams } from "react-router-dom";

import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "../AccountNav.jsx";

export default function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

 
const logout = async () => {
  const token = localStorage.getItem("token"); // Retrieve the token from local storage

  if (token) {
    try {
      await axios.post( "/logout", {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("token"); // Remove the token from local storage
      console.log("Logged out successfully");
      setRedirect("/");
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  } else {
    console.log("No token found");
  }
};
  //   if (!ready) {
  //   return <div>Loading...</div>
  // }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

 

  return (
    <div>
      <AccountNav/>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name}({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
}
