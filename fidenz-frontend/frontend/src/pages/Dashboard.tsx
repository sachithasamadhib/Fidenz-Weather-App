import { useEffect, useMemo, useState } from "react";
import WeatherCard from "../components/WeatherCard";
import { useWeatherApi } from "../api/weatherApi";
import type { City } from "../types/city";
import { temperatureToColorKey } from "../utils/color";

export default function Dashboard() {
  const api = useWeatherApi();
  const [cities, setCities] = useState<City[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api.get<City[]>("/weather").then((res) => setCities(res.data));
  }, [api]);

  const filtered = useMemo(() => {
    if (!query.trim()) return cities;
    return cities.filter((c) => c.cityName.toLowerCase().includes(query.toLowerCase()));
  }, [cities, query]);

  // Color is derived from temperature now

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900">
      <div className="max-w-6xl mx-auto px-6 pt-8">
        {/* Header search bar */}
        <div className="flex items-center gap-3 mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a city"
            className="w-full sm:w-1/2 rounded-full px-5 py-3 bg-white/10 text-white placeholder-white/70 outline-none border border-white/20 focus:border-white/40"
          />
          <button
            onClick={() => setQuery("")}
            className="rounded-full px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            Clear
          </button>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-12">
          {filtered.map((c) => (
            <WeatherCard
              key={c.cityID}
              cityID={c.cityID}
              cityName={c.cityName}
              description={c.description}
              temperature={c.temperature}
              color={temperatureToColorKey(c.temperature)}
              tempMin={c.tempMin}
              tempMax={c.tempMax}
              pressure={c.pressure}
              humidity={c.humidity}
              visibility={c.visibility}
              windSpeed={c.windSpeed}
              windDegree={c.windDegree}
              sunrise={c.sunrise}
              sunset={c.sunset}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
