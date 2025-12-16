import { Link } from "react-router-dom";
import { UtensilsCrossed, Store, ArrowRight, Zap, Bell, Clock } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
            <span className="text-white font-bold text-2xl">Q</span>
          </div>
          <span className="font-bold text-3xl bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            QueueLess
          </span>
        </div>

        {/* Tagline */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-4 max-w-2xl">
          Skip the Queue,{" "}
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Not the Food
          </span>
        </h1>
        <p className="text-gray-500 text-lg text-center max-w-md mb-12">
          College canteen ordering made simple. Order ahead, get notified on WhatsApp when ready.
        </p>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
          {/* Customer Card */}
          <Link
            to="/customer"
            className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden"
          >
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                <UtensilsCrossed size={28} className="text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                I'm Hungry
              </h2>
              <p className="text-gray-500 mb-6">
                Browse stalls, order food, and skip the queue. Get notified when your food is ready!
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
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                <Store size={28} className="text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                I'm a Vendor
              </h2>
              <p className="text-gray-500 mb-6">
                Manage your stall orders, update status, and notify customers when food is ready.
              </p>
              
              <div className="flex items-center gap-2 text-purple-500 font-semibold group-hover:gap-4 transition-all">
                Manage Orders
                <ArrowRight size={20} />
              </div>
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {[
            { icon: Zap, text: "Instant Orders", color: "text-yellow-500" },
            { icon: Bell, text: "WhatsApp Alerts", color: "text-green-500" },
            { icon: Clock, text: "No Waiting", color: "text-blue-500" },
          ].map((feature) => (
            <div key={feature.text} className="flex items-center gap-2 text-gray-600">
              <feature.icon size={20} className={feature.color} />
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-400 text-sm">
        Made with ❤️ for college canteens
      </footer>
    </div>
  );
};

export default LandingPage;