import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import toast from "react-hot-toast";

export default function AddProduct() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const submit = async () => {
    setSubmitting(true);

    try {
      await API.post("/product", form);
      toast.success("Product submitted for approval");
      navigate("/vendor");
    } catch (err) {
      toast.error("Failed to submit product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-lg mx-auto bg-white p-6 mt-8 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>

        <input
          className="input mb-3"
          placeholder="Product Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="input mb-3"
          placeholder="Price"
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          className="input mb-3"
          placeholder="Category"
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <input
          className="input mb-4"
          placeholder="Image URL (optional)"
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        {/* 🔘 SUBMIT BUTTON */}
        <button
          onClick={submit}
          disabled={submitting}
          className="btn-primary disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Product"}
        </button>
      </div>
    </div>
  );
}
