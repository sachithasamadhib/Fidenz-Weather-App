import { useNavigate } from "react-router-dom";
import { COLOR_BG_500 } from "../utils/color";
import type { ColorKey } from "../utils/color";

interface WeatherProps {
  cityID: string | number;
  cityName: string;
  description: string;
  temperature: number;
  color: ColorKey;  
  tempMin?: number;
  tempMax?: number;
  pressure?: number;
  humidity?: number;
  visibility?: number;
  windSpeed?: number;
  windDegree?: number;
  sunrise?: number;
  sunset?: number;
}

export default function WeatherCard(props: WeatherProps) {
  const navigate = useNavigate();
  const bgClass = COLOR_BG_500[props.color] ?? COLOR_BG_500.blue;

  return (
    <div
      onClick={() => navigate(`/city/${String(props.cityID)}`, { state: { color: props.color } })}
      className={`cursor-pointer rounded-2xl p-0 text-white shadow-xl overflow-hidden hover:scale-105 transition`}
    >
      <div className={`${bgClass} px-6 pt-5 pb-4`}>
        <div className="flex justify-between items-start gap-3">
          <h2 className="text-base sm:text-lg font-semibold">{props.cityName}</h2>
          <p className="text-2xl sm:text-3xl font-semibold whitespace-nowrap">{props.temperature}°C</p>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs sm:text-sm opacity-95 gap-3">
          <span className="truncate" title={props.description}>{props.description}</span>
          <span className="text-right shrink-0">
            <span className="opacity-80">Temp Min:</span> {props.tempMin ?? "—"}°C · {" "}
            <span className="opacity-80">Temp Max:</span> {props.tempMax ?? "—"}°C
          </span>
        </div>
      </div>
      <div className="bg-black/30 px-6 py-4 grid grid-cols-2 gap-3 text-sm">
        <div className="opacity-90">Pressure: {props.pressure ?? "—"}hPa</div>
        <div className="opacity-90">Humidity: {props.humidity ?? "—"}%</div>
        <div className="opacity-90">Visibility: {props.visibility != null ? (props.visibility / 1000).toFixed(1) + "km" : "—"}</div>
        <div className="opacity-90">Wind: {props.windSpeed != null ? `${props.windSpeed}m/s` : "—"} {props.windDegree != null ? `${props.windDegree}°` : ""}</div>
        <div className="opacity-90">Sunrise: {props.sunrise ? new Date(props.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}</div>
        <div className="opacity-90">Sunset: {props.sunset ? new Date(props.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}</div>
      </div>
    </div>
  );
}
