import { stalls } from "../data/stalls";
import StallCard from "../components/StallCard";
import { Store } from "lucide-react";

const VendorHome = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Store size={16} />
          Vendor Portal
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Manage Your{" "}
          <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Orders
          </span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Select your stall to view and manage incoming orders. Mark orders as
          ready to notify customers via WhatsApp.
        </p>
      </div>

      {/* Stalls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stalls.map((stall) => (
          <StallCard key={stall.id} stall={stall} isVendor />
        ))}
      </div>
    </div>
  );
};

export default VendorHome;