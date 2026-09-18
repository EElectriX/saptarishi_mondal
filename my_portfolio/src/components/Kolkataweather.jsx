import { useEffect, useState } from "react";

export default function KolkataWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      console.warn("VITE_WEATHER_API_KEY is not defined in .env");
      setLoading(false);
      return;
    }

    async function getWeather() {
      try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Kolkata`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch weather");
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error("Weather error:", error);
      } finally {
        setLoading(false);
      }
    }

    getWeather();
  }, [apiKey]);

  if (loading) {
    return (
      <div className="text-white/60 text-xs sm:text-sm font-light animate-pulse">
        Fetching weather...
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="text-white/40 text-xs sm:text-sm font-light">
        Weather unavailable
      </div>
    );
  }

  const { location, current } = weather;
  const conditionIcon = current.condition?.icon
    ? (current.condition.icon.startsWith("//") ? `https:${current.condition.icon}` : current.condition.icon)
    : null;

  return (
    <div className="text-left sm:text-right">
      {/* Location */}
      <h3 className="text-xs sm:text-sm text-white/70 font-light flex items-center sm:justify-end gap-1">
        <span>📍</span> {location.name}
      </h3>

      {/* Temperature & Condition Icon */}
      <div className="flex items-center sm:justify-end gap-2 mt-0.5">
        {conditionIcon && (
          <img
            src={conditionIcon}
            alt={current.condition?.text || "Weather condition"}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow"
          />
        )}
        <div className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white/95 leading-none">
          {Math.round(current.temp_c)}°C
        </div>
      </div>

      {/* Condition & Feels Like */}
      <p className="text-xs sm:text-sm text-white/70 font-light mt-1">
        {current.condition?.text} • Feels like {Math.round(current.feelslike_c)}°C
      </p>
    </div>
  );
}
