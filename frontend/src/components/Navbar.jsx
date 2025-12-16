import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Home, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  
  const isVendor = location.pathname.startsWith("/vendor");
  const isLanding = location.pathname === "/";
  
  // Don't show navbar on landing page
  if (isLanding) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Back to Landing + Logo */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Back to home"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          
          <Link to="/" className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isVendor 
                ? "bg-gradient-to-br from-purple-500 to-indigo-500" 
                : "bg-gradient-to-br from-orange-500 to-pink-500"
            }`}>
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <div>
              <span className={`font-bold text-xl bg-clip-text text-transparent ${
                isVendor
                  ? "bg-gradient-to-r from-purple-500 to-indigo-500"
                  : "bg-gradient-to-r from-orange-500 to-pink-500"
              }`}>
                QueueLess
              </span>
              <p className="text-xs text-gray-400 -mt-1">
                {isVendor ? "Vendor Portal" : "Customer"}
              </p>
            </div>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Switch Role Button */}
          <Link
            to={isVendor ? "/customer" : "/vendor"}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isVendor
                ? "bg-orange-100 text-orange-600 hover:bg-orange-200"
                : "bg-purple-100 text-purple-600 hover:bg-purple-200"
            }`}
          >
            {isVendor ? "Switch to Customer" : "Switch to Vendor"}
          </Link>

          {/* Cart - Only show on customer side */}
          {!isVendor && (
            <Link
              to="/checkout"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-all"
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