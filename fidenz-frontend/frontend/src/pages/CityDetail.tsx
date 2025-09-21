import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useWeatherApi } from "../api/weatherApi";
import type { City } from "../types/city";
import { COLOR_BG_600, temperatureToColorKey } from "../utils/color";

export default function CityDetail() {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const api = useWeatherApi();
  const [city, setCity] = useState<City | null>(null);

  useEffect(() => {
    api.get<City>(`/weather/${cityId}`).then((res) => setCity(res.data));
  }, [api, cityId]);

  const formatTime = useMemo(() => (epoch?: number) => {
    if (!epoch) return "—";
    const d = new Date(epoch * 1000);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }, []);

  if (!city) return <p className="text-center mt-10">Loading...</p>;

  // Prefer color passed from the card; fallback to computing from temperature
  const passedColor = (location.state as { color?: string } | null)?.color as any;
  const colorKey = passedColor ?? temperatureToColorKey(city.temperature);
  const bgClass = COLOR_BG_600[colorKey as keyof typeof COLOR_BG_600] ?? COLOR_BG_600.blue;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="text-white/80 hover:text-white mb-4"
          aria-label="Go back"
        >
          ← Back
        </button>
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <div className={`${bgClass} text-white p-6 sm:p-10`}>
            <h1 className="text-2xl sm:text-3xl font-semibold">{city.cityName}</h1>
            <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 items-center gap-4 sm:gap-6">
              <div className="text-base sm:text-lg opacity-95 text-center sm:text-left">
                {city.description}
              </div>
              <div className="text-center text-5xl sm:text-6xl font-semibold whitespace-nowrap">
                {city.temperature}°C
              </div>
              <div className="opacity-95 text-center sm:text-right mt-2 sm:mt-0">
                <div>Temp Min: {city.tempMin ?? "—"}°C</div>
                <div>Temp Max: {city.tempMax ?? "—"}°C</div>
              </div>
            </div>
          </div>
          <div className="bg-black/30 text-white p-8 grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
            <div>Pressure: {city.pressure ?? "—"}hPa</div>
            <div>Humidity: {city.humidity ?? "—"}%</div>
            <div>Visibility: {city.visibility != null ? (city.visibility / 1000).toFixed(1) + "km" : "—"}</div>
            <div>Wind: {city.windSpeed != null ? `${city.windSpeed}m/s` : "—"} {city.windDegree != null ? `${city.windDegree}°` : ""}</div>
            <div>Sunrise: {formatTime(city.sunrise)}</div>
            <div>Sunset: {formatTime(city.sunset)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
