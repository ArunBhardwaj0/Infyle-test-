export default function ProductCard({ product }) {
  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <img
        src={product.image || "https://via.placeholder.com/300"}
        className="h-40 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-bold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="font-semibold mt-1">₹ {product.price}</p>

        <span
          className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${statusColor[product.status]}`}
        >
          {product.status}
        </span>
      </div>
    </div>
  );
}
