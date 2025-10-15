import { Navigate } from "react-router-dom";
import { profile } from "../services/auth";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // tracking loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await profile();
        setUser(res.data.user); //-- backend returns user object
      } catch {
        setUser(null); // if error, treated as not logged in
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []); // empty array runs only once

  if (loading) return null; //  spinner

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
