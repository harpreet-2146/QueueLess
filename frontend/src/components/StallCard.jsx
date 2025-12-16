import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";

const StallCard = ({ stall, isVendor = false }) => {
  const linkTo = isVendor ? `/vendor/${stall.id}` : `/stall/${stall.id}`;

  return (
    <Link
      to={stall.isOpen ? linkTo : "#"}
      className={`group block ${!stall.isOpen && "cursor-not-allowed"}`}
    >
      <div
        className={`relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
          stall.isOpen ? "hover:-translate-y-2" : "opacity-60"
        }`}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={stall.image}
            alt={stall.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Status badge */}
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
              stall.isOpen
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {stall.isOpen ? "Open" : "Closed"}
          </div>

          {/* Stall name on image */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-bold text-xl">{stall.name}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-gray-500 text-sm mb-3">{stall.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-medium text-gray-700">
                {stall.rating}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <Clock size={16} />
              <span className="text-sm">{stall.waitTime}</span>
            </div>
          </div>

          {/* CTA */}
          {stall.isOpen && (
            <div className="mt-4 py-2 text-center bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              {isVendor ? "Manage Orders →" : "View Menu →"}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default StallCard;