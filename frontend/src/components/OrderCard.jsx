import { Clock, User, Phone, ChefHat, CheckCircle, Send } from "lucide-react";
import StatusBadge from "./StatusBadge";

const OrderCard = ({ order, onUpdateStatus, onSendWhatsApp }) => {
  const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    return `${Math.floor(diffMins / 60)}h ago`;
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">#{order.tokenNumber}</span>
          </div>
          <div>
            <p className="font-semibold text-gray-800">{order.customerName}</p>
            <p className="text-sm text-gray-400 flex items-center gap-1">
              <Clock size={12} />
              {timeAgo(order.createdAt)}
            </p>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Items */}
      <div className="bg-gray-50 rounded-xl p-3 mb-4">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-1"
          >
            <span className="text-gray-600">
              {item.name} × {item.quantity}
            </span>
            <span className="text-gray-800 font-medium">
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}
        <div className="border-t border-gray-200 mt-2 pt-2 flex items-center justify-between">
          <span className="font-semibold text-gray-800">Total</span>
          <span className="font-bold text-gray-800">₹{order.totalAmount}</span>
        </div>
      </div>

      {/* WhatsApp */}
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
        <Phone size={14} />
        <span>+91 {order.whatsappNumber}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {order.status === "pending" && (
          <button
            onClick={() => onUpdateStatus(order.id, "preparing")}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-all"
          >
            <ChefHat size={18} />
            Start Preparing
          </button>
        )}

        {order.status === "preparing" && (
          <button
            onClick={() => {
              onUpdateStatus(order.id, "ready");
              onSendWhatsApp(order);
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all"
          >
            <Send size={18} />
            Mark Ready & Notify
          </button>
        )}

        {order.status === "ready" && (
          <button
            onClick={() => onUpdateStatus(order.id, "completed")}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-all"
          >
            <CheckCircle size={18} />
            Mark Collected
          </button>
        )}

        {order.status === "completed" && (
          <div className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-500 py-3 rounded-xl font-medium">
            <CheckCircle size={18} />
            Order Completed
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;