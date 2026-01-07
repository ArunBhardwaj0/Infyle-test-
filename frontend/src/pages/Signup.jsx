import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl w-96 shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <input className="input" placeholder="Name" />
        <input className="input mt-2" placeholder="Email" />
        <input className="input mt-2" placeholder="Password" type="password" />

        <button
          onClick={() => navigate("/")}
          className="btn-primary mt-4"
        >
          Signup
        </button>
      </div>
    </div>
  );
}

