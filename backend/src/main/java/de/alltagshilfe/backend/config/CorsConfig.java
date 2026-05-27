package de.alltagshilfe.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Erlaubt dem Frontend (localhost:5173) Anfragen an das
 * Backend (localhost:8080) zu senden.
 *
 * Ohne diese Konfiguration blockiert der Browser alle
 * Anfragen, weil Frontend und Backend auf verschiedenen
 * Ports laufen – das gilt als unterschiedliche Origin.
 *
 * In Produktion wird hier die echte Domain eingetragen.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
