import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

try {
    const res = await API.post("/vendor/login", { email, password });

    localStorage.setItem("token", res.data.token);
    const user = res.data.vendor || { role: "vendor" };
    localStorage.setItem("user", JSON.stringify(user));

    toast.success("Login successful");

    navigate(user.role === "admin" ? "/admin" : "/vendor");
  } catch {
    toast.error("Invalid email or password");
  }


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ async function
  const login = async () => {
    try {
    const res = await API.post("/vendor/login", { email, password });

    localStorage.setItem("token", res.data.token);
    const user = res.data.vendor || { role: "vendor" };
    localStorage.setItem("user", JSON.stringify(user));

    toast.success("Login successful");

    navigate(user.role === "admin" ? "/admin" : "/vendor");
  } catch {
    toast.error("Invalid email or password");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          className="input mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="input mb-4"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login} className="btn-primary">
          Login
        </button>

        <button
          onClick={() =>
            (window.location.href =
              "http://localhost:5000/api/vendor/google")
          }
          className="mt-3 w-full border py-2 rounded"
        >
          Sign in with Google
        </button>

        <p className="text-sm mt-3 text-center">
          No account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}
