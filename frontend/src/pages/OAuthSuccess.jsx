import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    const role = params.get("role") || "vendor"; // backend se role aayega

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ role }));

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/vendor");
      }
    }
  }, []);

  return <p className="p-6">Signing you in with Google...</p>;
}
