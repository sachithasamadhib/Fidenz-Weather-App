package com.fidenz.assignment.fidenz_weather_app.controller;

import com.fidenz.assignment.fidenz_weather_app.model.WeatherResponse;
import com.fidenz.assignment.fidenz_weather_app.service.WeatherService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final WeatherService weatherService;
    private final List<String> cityCodes;

    public WeatherController(WeatherService weatherService) throws Exception {
        this.weatherService = weatherService;

        // Load city codes from cities.json
        InputStream is = getClass().getClassLoader().getResourceAsStream("cities.json");
        if (is == null) {
            throw new RuntimeException("cities.json not found in resources");
        }
        String text = new String(is.readAllBytes(), StandardCharsets.UTF_8);
        JSONObject obj = new JSONObject(text);
    JSONArray list = obj.getJSONArray("List");
    java.util.ArrayList<String> codes = new java.util.ArrayList<>();
    for (int i = 0; i < list.length(); i++) {
        JSONObject item = list.getJSONObject(i);
        String code = item.get("CityCode").toString();
        codes.add(code);
    }
    this.cityCodes = java.util.Collections.unmodifiableList(codes);
    }

    // Return weather for all cities this only for the authenticated users
    @PreAuthorize("hasAuthority('SCOPE_read:weather')")
    @GetMapping
    public List<WeatherResponse> getAllWeather() {
        return cityCodes.stream()
                .map(weatherService::getWeatherByCityId)
                .toList();
    }

    // Return weather for one city
    @PreAuthorize("hasAuthority('SCOPE_read:weather')")
    @GetMapping("/{cityId}")
    public WeatherResponse getWeatherByCityId(@PathVariable String cityId) {
        return weatherService.getWeatherByCityId(cityId);
    }
}
