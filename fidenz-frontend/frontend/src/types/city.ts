export interface City {
  cityID: string | number;
  cityName: string;
  description: string;
  temperature: number;
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
