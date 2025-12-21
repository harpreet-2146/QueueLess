import { useState, useEffect } from "react";
import { Users, Armchair, RefreshCw } from "lucide-react";

const SeatAvailability = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchSeatCount = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/seat-count");
      if (!response.ok) throw new Error("Camera service unavailable");
      const result = await response.json();
      setData(result);
      setError(null);
      setLastUpdated(new Date());
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Camera offline");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeatCount();
    // Poll every 3 seconds
    const interval = setInterval(fetchSeatCount, 3000);
    return () => clearInterval(interval);
  }, []);

  // Determine color based on occupancy
  const getStatusColor = (percent) => {
    if (percent < 50) return { bg: "bg-green-500", text: "text-green-500", light: "bg-green-100" };
    if (percent < 80) return { bg: "bg-yellow-500", text: "text-yellow-500", light: "bg-yellow-100" };
    return { bg: "bg-red-500", text: "text-red-500", light: "bg-red-100" };
  };

  const getStatusText = (percent) => {
    if (percent < 50) return "Plenty of seats";
    if (percent < 80) return "Filling up";
    return "Almost full";
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-md animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
            <Armchair size={24} className="text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800">Seat Availability</p>
            <p className="text-sm text-gray-400">{error}</p>
          </div>
          <button
            onClick={fetchSeatCount}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <RefreshCw size={18} className="text-gray-400" />
          </button>
        </div>
      </div>
    );
  }

  const colors = getStatusColor(data.occupancy_percent);
  const statusText = getStatusText(data.occupancy_percent);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className={`w-14 h-14 ${colors.light} rounded-xl flex items-center justify-center`}>
          <Users size={28} className={colors.text} />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-800">{data.count}</span>
            <span className="text-gray-400">/ {data.capacity}</span>
          </div>
          <p className={`text-sm font-medium ${colors.text}`}>{statusText}</p>
        </div>

        {/* Progress Ring */}
        <div className="relative w-14 h-14">
          <svg className="w-14 h-14 transform -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${(data.occupancy_percent / 100) * 150.8} 150.8`}
              strokeLinecap="round"
              className={colors.text}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-gray-800">
              {Math.round(data.occupancy_percent)}%
            </span>
          </div>
        </div>
      </div>

      {/* Available seats bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-500">Available seats</span>
          <span className="font-semibold text-gray-800">{data.available}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${colors.bg} transition-all duration-500`}
            style={{ width: `${data.occupancy_percent}%` }}
          />
        </div>
      </div>

      {/* Last updated */}
      {lastUpdated && (
        <p className="text-xs text-gray-400 mt-3 text-center">
          Live • Updated {lastUpdated.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
};

export default SeatAvailability;