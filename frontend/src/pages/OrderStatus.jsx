import { useParams, Link } from "react-router-dom";
import { Home, Clock, ChefHat, CheckCircle2, Package } from "lucide-react";
import { useOrders } from "../context/OrderContext";

const statusConfig = {
  pending: {
    icon: Clock,
    text: "Order Received",
    description: "Your order has been received by the stall",
    color: "text-yellow-500",
    bg: "bg-yellow-100",
  },
  preparing: {
    icon: ChefHat,
    text: "Preparing",
    description: "Your food is being prepared",
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
  ready: {
    icon: CheckCircle2,
    text: "Ready for Pickup!",
    description: "Your order is ready! Please collect it now",
    color: "text-green-500",
    bg: "bg-green-100",
  },
  completed: {
    icon: Package,
    text: "Completed",
    description: "Order has been collected",
    color: "text-gray-500",
    bg: "bg-gray-100",
  },
};

const OrderStatus = () => {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order not found
        </h1>
        <p className="text-gray-500 mb-6">
          This order doesn't exist or has expired
        </p>
        <Link
          to="/customer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium"
        >
          <Home size={18} />
          Go Home
        </Link>
      </div>
    );
  }

  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  return (
    <div className="max-w-md mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div
          className={`w-20 h-20 ${status.bg} rounded-full flex items-center justify-center mx-auto mb-4`}
        >
          <StatusIcon size={40} className={status.color} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{status.text}</h1>
        <p className="text-gray-500">{status.description}</p>
      </div>

      {/* Token Card */}
      <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl p-6 text-white text-center mb-6 shadow-xl">
        <p className="text-white/80 text-sm mb-2">Your Token Number</p>
        <h2 className="text-6xl font-bold mb-2">#{order.tokenNumber}</h2>
        <p className="text-white/80">Show this at the counter</p>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-2xl p-4 shadow-md mb-6">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <div>
            <p className="text-gray-500 text-sm">Order ID</p>
            <p className="font-mono font-medium text-gray-800">{order.id}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">Stall</p>
            <p className="font-medium text-gray-800">{order.stallName}</p>
          </div>
        </div>

        <h3 className="font-semibold text-gray-800 mb-3">Items Ordered</h3>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <span className="text-gray-600">
                {item.name} × {item.quantity}
              </span>
              <span className="font-medium text-gray-800">
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 mt-4 pt-4 flex items-center justify-between">
          <span className="font-semibold text-gray-800">Total</span>
          <span className="text-xl font-bold text-gray-800">
            ₹{order.totalAmount}
          </span>
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-white rounded-2xl p-4 shadow-md mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Notification</h3>
        <p className="text-gray-500 text-sm">
          WhatsApp notification will be sent to{" "}
          <span className="font-medium text-gray-800">
            +91 {order.whatsappNumber}
          </span>{" "}
          when your order is ready.
        </p>
      </div>

      {/* Status Timeline */}
      <div className="bg-white rounded-2xl p-4 shadow-md mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Order Progress</h3>
        <div className="space-y-4">
          {["pending", "preparing", "ready", "completed"].map((step, index) => {
            const stepConfig = statusConfig[step];
            const StepIcon = stepConfig.icon;
            const isActive = step === order.status;
            const isPast =
              ["pending", "preparing", "ready", "completed"].indexOf(
                order.status
              ) >= index;

            return (
              <div key={step} className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isPast ? stepConfig.bg : "bg-gray-100"
                  }`}
                >
                  <StepIcon
                    size={20}
                    className={isPast ? stepConfig.color : "text-gray-400"}
                  />
                </div>
                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      isActive ? "text-gray-800" : "text-gray-400"
                    }`}
                  >
                    {stepConfig.text}
                  </p>
                </div>
                {isPast && (
                  <CheckCircle2
                    size={20}
                    className={isActive ? "text-green-500" : "text-gray-300"}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Home Button */}
      <Link
        to="/customer"
        className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 py-4 rounded-2xl font-medium hover:bg-gray-200 transition-all"
      >
        <Home size={18} />
        Order More Food
      </Link>
    </div>
  );
};

export default OrderStatus;