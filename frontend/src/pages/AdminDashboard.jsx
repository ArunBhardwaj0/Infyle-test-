import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/admin/products/pending");
      setProducts(res.data);
    } catch {
      alert("Failed to load products");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/products/${id}`, { status });
      setProducts(products.filter((p) => p._id !== id));
    } catch {
      alert("Action failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        {products.length === 0 ? (
          <p>No pending products</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white p-4 rounded-lg shadow"
              >
                <img
                  src={p.image || "https://via.placeholder.com/300"}
                  className="h-40 w-full object-cover rounded"
                />

                <h3 className="font-bold mt-2">{p.name}</h3>
                <p className="text-sm text-gray-500">
                  Category: {p.category}
                </p>
                <p className="font-semibold">₹ {p.price}</p>

                <div className="mt-2 text-sm">
                  <p><b>Vendor:</b> {p.vendor?.name}</p>
                  <p><b>Email:</b> {p.vendor?.email}</p>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => updateStatus(p._id, "Approved")}
                    className="bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(p._id, "Rejected")}
                    className="bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
