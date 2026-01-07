import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear(); // 🔥 token + user removed
    navigate("/");        // 🔁 back to login
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-indigo-600 text-white"
      >
        {user?.name?.charAt(0) || "U"}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow rounded">
          <div className="px-4 py-2 border-b">
            <p className="font-semibold">{user?.name || "User"}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
