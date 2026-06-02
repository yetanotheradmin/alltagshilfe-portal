package de.alltagshilfe.backend.config;

import de.alltagshilfe.backend.service.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Finale Spring Security Konfiguration.
 *
 * Öffentliche Endpunkte (/api/public/**, /h2-console):
 * ohne Authentifizierung erreichbar.
 *
 * Admin-Endpunkte (/api/admin/**):
 * nur für eingeloggte Benutzer mit Rolle STAFF oder ADMIN.
 *
 * Auth-Endpunkte (/api/auth/**):
 * öffentlich erreichbar für Login und Logout.
 *
 * CORS wird direkt hier konfiguriert, damit Spring Security
 * Preflight-Requests (OPTIONS) korrekt durchlässt – bevor
 * die Authentifizierungsprüfung greift.
 */
@Configuration
public class SecurityConfig {

    private final UserDetailsServiceImpl userDetailsService;

    public SecurityConfig(UserDetailsServiceImpl userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .headers(headers -> headers.frameOptions(frame -> frame.disable()))
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            )
            .authorizeHttpRequests(auth -> auth
                // H2-Konsole öffentlich (nur Entwicklung)
                .requestMatchers("/h2-console/**").permitAll()
                // Öffentliche API ohne Authentifizierung
                .requestMatchers("/api/public/**").permitAll()
                // Auth-Endpunkte ohne Authentifizierung
                .requestMatchers("/api/auth/**").permitAll()
                // Admin-Endpunkte nur für STAFF oder ADMIN
                .requestMatchers("/api/admin/**").hasAnyRole("STAFF", "ADMIN")
                // Alles andere ebenfalls sperren
                .anyRequest().authenticated()
            )
            .userDetailsService(userDetailsService)
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable());

        return http.build();
    }

    /**
     * CORS-Konfiguration für den Browser.
     * allowedOriginPatterns statt allowedOrigins ist erforderlich
     * wenn allowCredentials(true) gesetzt ist.
     * allowCredentials ermöglicht das Mitsenden von Session-Cookies.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    /**
     * BCrypt ist der Standard für sicheres Passwort-Hashing.
     * Der Kostenfaktor (Standard: 10) bestimmt wie rechenintensiv
     * das Hashing ist – höher = sicherer aber langsamer.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * AuthenticationManager wird für den manuellen Login
     * im AuthController benötigt.
     */
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}