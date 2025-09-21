export type ColorKey = "blue" | "cyan" | "green" | "yellow" | "orange" | "red" | "pink" | "purple";

export const COLOR_BG_500: Record<ColorKey, string> = {
  blue: "bg-blue-500",
  cyan: "bg-cyan-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
  pink: "bg-pink-500",
  purple: "bg-purple-500",
};

export const COLOR_BG_600: Record<ColorKey, string> = {
  blue: "bg-blue-600",
  cyan: "bg-cyan-600",
  green: "bg-green-600",
  yellow: "bg-yellow-600",
  orange: "bg-orange-600",
  red: "bg-red-600",
  pink: "bg-pink-600",
  purple: "bg-purple-600",
};

export function temperatureToColorKey(temp: number | undefined | null): ColorKey {
  if (temp == null || Number.isNaN(temp)) return "blue";
  if (temp < 0) return "purple"; 
  if (temp < 10) return "blue";     
  if (temp < 20) return "cyan";
  if (temp < 25) return "green";    
  if (temp < 30) return "yellow";  
  if (temp < 35) return "orange";       
  return "red";                       
}
