package com.fidenz.assignment.fidenz_weather_app.service;

import com.fidenz.assignment.fidenz_weather_app.model.WeatherResponse;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Value("${openweathermap.api.key}")
    private String apiKey;

    @Value("${openweathermap.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Cacheable(value = "weather", key = "#cityId")
    public WeatherResponse getWeatherByCityId(String cityId) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("OpenWeatherMap API key is not configured. Set OPENWEATHERMAP_API_KEY.");
        }
        String url = apiUrl + "?id=" + cityId + "&appid=" + apiKey + "&units=metric";
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            String body = response.getBody();
            if (body == null || body.isBlank()) {
                throw new IllegalStateException("Empty response from weather provider");
            }

            JSONObject json = new JSONObject(body);
            String cityName = json.optString("name", "Unknown");
            String description = json.getJSONArray("weather").getJSONObject(0).getString("description");
            var main = json.getJSONObject("main");
            var wind = json.optJSONObject("wind");
            var sys = json.optJSONObject("sys");

            double temperature = main.getDouble("temp");
            Double tempMin = main.has("temp_min") ? main.getDouble("temp_min") : null;
            Double tempMax = main.has("temp_max") ? main.getDouble("temp_max") : null;
            Integer pressure = main.has("pressure") ? main.getInt("pressure") : null;
            Integer humidity = main.has("humidity") ? main.getInt("humidity") : null;
            Integer visibility = json.has("visibility") ? json.getInt("visibility") : null;
            Double windSpeed = (wind != null && wind.has("speed")) ? wind.getDouble("speed") : null;
            Integer windDegree = (wind != null && wind.has("deg")) ? wind.getInt("deg") : null;
            Long sunrise = (sys != null && sys.has("sunrise")) ? sys.getLong("sunrise") : null;
            Long sunset = (sys != null && sys.has("sunset")) ? sys.getLong("sunset") : null;

            WeatherResponse resp = new WeatherResponse(cityId, cityName, description, temperature,
                tempMin, tempMax, pressure, humidity, visibility, windSpeed, windDegree, sunrise, sunset);
            return resp;
        } catch (HttpClientErrorException e) {
            throw new RuntimeException("Weather API client error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
        } catch (RestClientException e) {
            throw new RuntimeException("Weather API call failed: " + e.getMessage(), e);
        }
    }
}
