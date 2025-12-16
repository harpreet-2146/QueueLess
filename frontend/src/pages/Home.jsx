import { stalls } from "../data/stalls";
import StallCard from "../components/StallCard";
import { Utensils } from "lucide-react";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Utensils size={16} />
          College Canteen
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Skip the Queue,{" "}
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Not the Food
          </span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Order from your favorite canteen stalls and get notified on WhatsApp
          when your food is ready. No more waiting in lines!
        </p>
      </div>

      {/* How it works */}
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {[
          { step: "1", text: "Choose a stall" },
          { step: "2", text: "Add items to cart" },
          { step: "3", text: "Enter WhatsApp number" },
          { step: "4", text: "Get notified when ready!" },
        ].map((item) => (
          <div key={item.step} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {item.step}
            </div>
            <span className="text-gray-600 text-sm">{item.text}</span>
          </div>
        ))}
      </div>

      {/* Stalls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stalls.map((stall) => (
          <StallCard key={stall.id} stall={stall} />
        ))}
      </div>
    </div>
  );
};

export default Home;