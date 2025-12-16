import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Package, Clock, ChefHat, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { getStallById } from "../data/stalls";
import { useOrders } from "../context/OrderContext";
import { messages } from "../utils/whatsapp";
import OrderCard from "../components/OrderCard";

const VendorDashboard = () => {
  const { stallId } = useParams();
  const stall = getStallById(stallId);
  const { getOrdersByStall, updateOrderStatus } = useOrders();

  const orders = getOrdersByStall(stallId);

  const sendWhatsAppNotification = async (order) => {
    const message = messages.orderReady(order.tokenNumber, order.stallName);
    const phone = order.whatsappNumber;

    // For demo, we'll open WhatsApp web with the message
    // In production with CallMeBot API key, this would be automatic
    const whatsappUrl = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    toast.success(`WhatsApp notification sent to ${order.customerName}!`, {
      icon: "📱",
    });
  };

  if (!stall) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold text-gray-800">Stall not found</h1>
        <Link to="/vendor" className="text-orange-500 mt-4 inline-block">
          ← Back to stalls
        </Link>
      </div>
    );
  }

  // Group orders by status
  const pendingOrders = orders.filter((o) => o.status === "pending");
  const preparingOrders = orders.filter((o) => o.status === "preparing");
  const readyOrders = orders.filter((o) => o.status === "ready");
  const completedOrders = orders.filter((o) => o.status === "completed");

  const stats = [
    {
      label: "Pending",
      count: pendingOrders.length,
      icon: Clock,
      color: "text-yellow-500",
      bg: "bg-yellow-100",
    },
    {
      label: "Preparing",
      count: preparingOrders.length,
      icon: ChefHat,
      color: "text-blue-500",
      bg: "bg-blue-100",
    },
    {
      label: "Ready",
      count: readyOrders.length,
      icon: Package,
      color: "text-green-500",
      bg: "bg-green-100",
    },
    {
      label: "Completed",
      count: completedOrders.length,
      icon: CheckCircle,
      color: "text-gray-500",
      bg: "bg-gray-100",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <Link
        to="/vendor"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to stalls</span>
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <img
          src={stall.image}
          alt={stall.name}
          className="w-16 h-16 rounded-2xl object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{stall.name}</h1>
          <p className="text-gray-500">Order Management Dashboard</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-4 shadow-md"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}
                >
                  <Icon size={20} className={stat.color} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.count}
                  </p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orders */}
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package size={40} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            No orders yet
          </h2>
          <p className="text-gray-500">
            Orders will appear here when customers place them
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Pending */}
          {pendingOrders.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Clock size={20} className="text-yellow-500" />
                Pending Orders ({pendingOrders.length})
              </h2>
              <div className="grid gap-4">
                {pendingOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onUpdateStatus={updateOrderStatus}
                    onSendWhatsApp={sendWhatsAppNotification}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Preparing */}
          {preparingOrders.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ChefHat size={20} className="text-blue-500" />
                Preparing ({preparingOrders.length})
              </h2>
              <div className="grid gap-4">
                {preparingOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onUpdateStatus={updateOrderStatus}
                    onSendWhatsApp={sendWhatsAppNotification}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Ready */}
          {readyOrders.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Package size={20} className="text-green-500" />
                Ready for Pickup ({readyOrders.length})
              </h2>
              <div className="grid gap-4">
                {readyOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onUpdateStatus={updateOrderStatus}
                    onSendWhatsApp={sendWhatsAppNotification}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Completed */}
          {completedOrders.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-gray-500" />
                Completed ({completedOrders.length})
              </h2>
              <div className="grid gap-4 opacity-60">
                {completedOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onUpdateStatus={updateOrderStatus}
                    onSendWhatsApp={sendWhatsAppNotification}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;