package com.fidenz.assignment.fidenz_weather_app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeatherResponse {
    private String cityID;
    private String cityName;
    private String description;
    private double temperature;
    private Double tempMin;
    private Double tempMax;
    private Integer pressure;
    private Integer humidity;
    private Integer visibility;
    private Double windSpeed;
    private Integer windDegree;
    private Long sunrise;
    private Long sunset;
}
