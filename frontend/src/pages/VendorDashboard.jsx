import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import API from "../services/api";
import toast from "react-hot-toast";

export default function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await API.get("/product/vendor");
        setProducts(res.data);
      } catch (err) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Products</h2>

          <Link
            to="/add-product"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            + Add Product
          </Link>
        </div>

        {/* 🔄 LOADING STATE */}
        {loading && (
          <p className="text-center mt-10 text-gray-500">
            Loading products...
          </p>
        )}

        {/* 📦 PRODUCTS GRID */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* 📭 EMPTY STATE */}
        {!loading && products.length === 0 && (
          <div className="text-center mt-12 text-gray-500">
            <p className="mb-2">No products added yet</p>
            <Link
              to="/add-product"
              className="text-indigo-600 underline"
            >
              Add your first product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
