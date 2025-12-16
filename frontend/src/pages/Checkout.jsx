import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2, Send } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { getStallById } from "../data/stalls";

const Checkout = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    stallId,
    totalAmount,
    addToCart,
    removeFromCart,
    clearCart,
  } = useCart();
  const { createOrder } = useOrders();

  const [customerName, setCustomerName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stall = stallId ? getStallById(stallId) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!whatsappNumber.trim() || whatsappNumber.length < 10) {
      toast.error("Please enter a valid WhatsApp number");
      return;
    }

    setIsSubmitting(true);

    try {
      const order = createOrder({
        customerName: customerName.trim(),
        whatsappNumber: whatsappNumber.trim(),
        stallId,
        stallName: stall.name,
        items: cartItems,
        totalAmount,
      });

      clearCart();
      toast.success("Order placed successfully!");
      navigate(`/order/${order.id}`);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trash2 size={40} className="text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-6">
          Add some delicious items from our stalls!
        </p>
        <Link
          to="/customer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all"
        >
          Browse Stalls
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Back button */}
      <Link
        to={`/stall/${stallId}`}
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to menu</span>
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
        <p className="text-gray-500">
          Ordering from{" "}
          <span className="text-orange-500 font-medium">{stall?.name}</span>
        </p>
      </div>

      {/* Cart Items */}
      <div className="bg-white rounded-2xl p-4 shadow-md mb-6">
        <h2 className="font-semibold text-gray-800 mb-4">Your Items</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <p className="text-gray-500 text-sm">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => addToCart(item, stall)}
                  className="w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-500 rounded-full hover:bg-orange-200"
                >
                  <Plus size={14} />
                </button>
              </div>
              <p className="font-semibold text-gray-800 w-16 text-right">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t border-gray-100 mt-4 pt-4 flex items-center justify-between">
          <span className="text-gray-500">Total Amount</span>
          <span className="text-2xl font-bold text-gray-800">
            ₹{totalAmount}
          </span>
        </div>
      </div>

      {/* Customer Details Form */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl p-4 shadow-md mb-6">
          <h2 className="font-semibold text-gray-800 mb-4">Your Details</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">
                WhatsApp Number
              </label>
              <div className="flex items-center gap-2">
                <div className="px-4 py-3 bg-gray-100 rounded-xl text-gray-500">
                  +91
                </div>
                <input
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) =>
                    setWhatsappNumber(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter 10-digit number"
                  maxLength={10}
                  className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                You'll receive order updates on this number
              </p>
            </div>
          </div>
        </div>

        {/* CallMeBot Notice */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
          <p className="text-sm text-green-800">
            <strong>📱 First time?</strong> To receive WhatsApp notifications,
            save{" "}
            <span className="font-mono bg-green-100 px-1 rounded">
              +34 644 71 81 99
            </span>{" "}
            and send{" "}
            <span className="font-mono bg-green-100 px-1 rounded">
              I allow callmebot to send me messages
            </span>
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            "Placing Order..."
          ) : (
            <>
              <Send size={20} />
              Place Order
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Checkout;