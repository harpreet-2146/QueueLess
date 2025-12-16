import { stalls } from "../data/stalls";
import StallCard from "../components/StallCard";
import { Search, Package } from "lucide-react";
import { useState } from "react";
import { useOrders } from "../context/OrderContext";

const VendorHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { orders } = useOrders();

  const filteredStalls = stalls.filter((stall) =>
    stall.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Count pending orders per stall
  const getPendingCount = (stallId) => {
    return orders.filter(
      (o) => o.stallId === stallId && (o.status === "pending" || o.status === "preparing")
    ).length;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Manage Your{" "}
          <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Orders
          </span>
        </h1>
        <p className="text-gray-500">
          Select your stall to view and manage incoming orders
        </p>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm">Total Active Orders</p>
            <p className="text-4xl font-bold">
              {orders.filter((o) => o.status !== "completed").length}
            </p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Package size={32} />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search your stall..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
        />
      </div>

      {/* Stalls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStalls.map((stall) => {
          const pendingCount = getPendingCount(stall.id);
          return (
            <div key={stall.id} className="relative">
              {pendingCount > 0 && (
                <div className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg animate-pulse">
                  {pendingCount}
                </div>
              )}
              <StallCard stall={stall} isVendor />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VendorHome;