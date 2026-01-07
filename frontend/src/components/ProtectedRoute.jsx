import { Navigate } from "react-router-dom";
import { getToken, getUser } from "../utils/auth";

export default function ProtectedRoute({ children, role }) {
  const token = getToken();
  const user = getUser();

  // ❌ Not logged in
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // ❌ Role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // ✅ Allowed
  return children;
}
