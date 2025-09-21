package com.fidenz.assignment.fidenz_weather_app.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public Caffeine<Object,Object> caffeineConfig() {
        return Caffeine.newBuilder()
                .expireAfterWrite(5, TimeUnit.MINUTES); // 5-minute cache
    }

    @Bean
    public CacheManager cacheManager(Caffeine<Object,Object> caffeine) {
        CaffeineCacheManager manager = new CaffeineCacheManager("weather");
        manager.setCaffeine(caffeine);
        return manager;
    }
}
