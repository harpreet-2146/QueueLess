import { stalls } from "../data/stalls";
import StallCard from "../components/StallCard";
import { Search } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStalls = stalls.filter((stall) =>
    stall.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          What's for{" "}
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            lunch today?
          </span>
        </h1>
        <p className="text-gray-500">
          Choose a stall and order ahead. We'll notify you when it's ready!
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search stalls..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
        />
      </div>

      {/* Stalls Grid */}
      {filteredStalls.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStalls.map((stall) => (
            <StallCard key={stall.id} stall={stall} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500">No stalls found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

export default Home;