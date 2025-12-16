import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Store, User } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const isVendor = location.pathname.startsWith("/vendor");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">Q</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            QueueLess
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              !isVendor
                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <User size={18} />
            Customer
          </Link>
          <Link
            to="/vendor"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              isVendor
                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Store size={18} />
            Vendor
          </Link>

          {/* Cart - Only show on customer side */}
          {!isVendor && (
            <Link
              to="/checkout"
              className="relative ml-2 p-2 rounded-full hover:bg-gray-100 transition-all"
            >
              <ShoppingCart size={24} className="text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;