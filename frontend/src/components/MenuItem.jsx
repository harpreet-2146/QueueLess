import { Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

const MenuItem = ({ item, stall }) => {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(item.id);

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all ${
        !item.available && "opacity-50"
      }`}
    >
      <div className="flex">
        {/* Image */}
        <div className="w-28 h-28 flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">{item.name}</h3>
            <p className="text-gray-400 text-xs mt-1 line-clamp-1">
              {item.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-gray-800">₹{item.price}</span>

            {item.available ? (
              quantity === 0 ? (
                <button
                  onClick={() => addToCart(item, stall)}
                  className="px-4 py-1.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all"
                >
                  Add
                </button>
              ) : (
                <div className="flex items-center gap-3 bg-gray-100 rounded-full px-2 py-1">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-50"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-semibold text-gray-800 w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item, stall)}
                    className="w-7 h-7 flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow-sm"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )
            ) : (
              <span className="text-xs text-red-500 font-medium">
                Unavailable
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;