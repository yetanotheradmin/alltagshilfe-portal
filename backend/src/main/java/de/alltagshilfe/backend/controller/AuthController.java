package de.alltagshilfe.backend.controller;

import de.alltagshilfe.backend.dto.LoginRequestDto;
import de.alltagshilfe.backend.dto.UserResponseDto;
import de.alltagshilfe.backend.entity.User;
import de.alltagshilfe.backend.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;


/**
 * Stellt Endpunkte für Login, Logout und den aktuellen Benutzer bereit.
 *
 * Spring Security speichert die Session serverseitig –
 * nach erfolgreichem Login wird eine Session-ID als Cookie
 * an den Browser gesendet. Das Frontend schickt diesen Cookie
 * bei jeder weiteren Anfrage automatisch mit.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    /**
     * Login-Endpunkt.
     * Prüft E-Mail und Passwort gegen die Datenbank.
     * Bei Erfolg wird eine Session angelegt.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDto dto,
                                HttpServletRequest request) {
    try {
        Authentication auth = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(auth);

        // Session explizit erstellen und Authentication darin speichern
        HttpSession session = request.getSession(true);
        session.setAttribute(
            "SPRING_SECURITY_CONTEXT",
            SecurityContextHolder.getContext()
        );

        User user = userRepository.findByEmail(dto.getEmail()).orElseThrow();

        UserResponseDto response = new UserResponseDto();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().name());

        return ResponseEntity.ok(response);

    } catch (BadCredentialsException e) {
        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(Map.of("message", "E-Mail oder Passwort ist falsch."));
    }
}

    /**
     * Gibt den aktuell eingeloggten Benutzer zurück.
     * Wird vom Frontend beim Start genutzt um zu prüfen
     * ob noch eine gültige Session existiert.
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()
                || auth.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Nicht eingeloggt."));
        }

        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        UserResponseDto response = new UserResponseDto();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().name());

        return ResponseEntity.ok(response);
    }

    /**
     * Logout-Endpunkt.
     * Löscht die aktuelle Session serverseitig.
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(Map.of("message", "Erfolgreich ausgeloggt."));
    }
}