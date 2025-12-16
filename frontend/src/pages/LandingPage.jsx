import { Link } from "react-router-dom";
import { UtensilsCrossed, Store, ArrowRight, Zap, Bell, Clock } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
            <span className="text-white font-bold text-2xl">Q</span>
          </div>
          <span className="font-bold text-3xl bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            QueueLess
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-6 max-w-2xl">
          Skip the Queue,{" "}
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Not the Food
          </span>
        </h1>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <FeaturePill icon={Zap} text="Instant Orders" color="bg-yellow-100 text-yellow-700" />
          <FeaturePill icon={Bell} text="WhatsApp Alerts" color="bg-green-100 text-green-700" />
          <FeaturePill icon={Clock} text="No Waiting" color="bg-blue-100 text-blue-700" />
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
          
          {/* Customer Card */}
          <Link
            to="/customer"
            className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                <UtensilsCrossed size={28} className="text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                I'm Hungry
              </h2>
              <p className="text-gray-500 mb-6">
                Browse stalls, order food, and skip the queue.
              </p>
              
              <div className="flex items-center gap-2 text-orange-500 font-semibold group-hover:gap-4 transition-all">
                Start Ordering
                <ArrowRight size={20} />
              </div>
            </div>
          </Link>

          {/* Vendor Card */}
          <Link
            to="/vendor"
            className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                <Store size={28} className="text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                I'm a Vendor
              </h2>
              <p className="text-gray-500 mb-6">
                Manage your stall orders and notify customers.
              </p>
              
              <div className="flex items-center gap-2 text-purple-500 font-semibold group-hover:gap-4 transition-all">
                Manage Orders
                <ArrowRight size={20} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeaturePill = ({ icon: Icon, text, color }) => (
  <div
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-sm ${color}`}
  >
    <Icon size={16} />
    <span>{text}</span>
  </div>
);

export default LandingPage;
