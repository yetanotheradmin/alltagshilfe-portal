package de.alltagshilfe.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Temporäre Security-Konfiguration für die Entwicklungsphase (Tag 2–8).
 * Alle Endpunkte sind vorerst ohne Authentifizierung erreichbar,
 * damit API-Tests und die H2-Konsole ungehindert funktionieren.
 * Wird an Tag 9 durch die finale Konfiguration ersetzt.
 */
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
            .csrf(csrf -> csrf.disable())
            .headers(headers -> headers.frameOptions(frame -> frame.disable()));
        return http.build();
    }
}
