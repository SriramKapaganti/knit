import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { profile } from "../services/auth";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await profile();
        setUser(res.data.user); // ensure backend returns { user: {...} }
      } catch (err) {
        console.log(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>; // better UX

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
