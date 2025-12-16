import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Star, ShoppingCart } from "lucide-react";
import { getStallById } from "../data/stalls";
import { useCart } from "../context/CartContext";
import MenuItem from "../components/MenuItem";

const StallMenu = () => {
  const { stallId } = useParams();
  const stall = getStallById(stallId);
  const { totalItems, totalAmount, stallId: cartStallId } = useCart();

  if (!stall) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold text-gray-800">Stall not found</h1>
        <Link to="/" className="text-orange-500 mt-4 inline-block">
          ← Back to stalls
        </Link>
      </div>
    );
  }

  const showCart = totalItems > 0 && cartStallId === stall.id;

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Back button */}
      <Link
        to="/customer"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to stalls</span>
      </Link>

      {/* Stall Header */}
      <div className="relative rounded-3xl overflow-hidden mb-8">
        <img
          src={stall.image}
          alt={stall.name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-3xl font-bold text-white mb-2">{stall.name}</h1>
          <p className="text-white/80 text-sm mb-3">{stall.description}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={16} fill="currentColor" />
              <span className="text-white text-sm">{stall.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-white/60">
              <Clock size={16} />
              <span className="text-sm">{stall.waitTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="mb-32">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Menu</h2>
        <div className="grid grid-cols-2 gap-4">
          {stall.menu.map((item) => (
            <MenuItem key={item.id} item={item} stall={stall} />
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {showCart && (
        <div className="fixed bottom-6 left-4 right-4 w-full max-w-7xl mx-auto px-4">
          <Link
            to="/checkout"
            className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-4 rounded-2xl shadow-2xl hover:shadow-orange-500/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <ShoppingCart size={20} />
              </div>
              <div>
                <p className="font-semibold">{totalItems} items</p>
                <p className="text-sm text-white/80">from {stall.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">₹{totalAmount}</p>
              <p className="text-sm text-white/80">View Cart →</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default StallMenu;