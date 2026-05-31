package de.alltagshilfe.backend.service;

import de.alltagshilfe.backend.entity.User;
import de.alltagshilfe.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Verbindet Spring Security mit unserer Benutzerdatenbank.
 *
 * Wenn jemand versucht sich einzuloggen, ruft Spring Security
 * diese Methode auf und übergibt die eingegebene E-Mail-Adresse.
 * Wir laden den passenden User aus der Datenbank und geben
 * Spring Security die nötigen Informationen zurück.
 *
 * Das Präfix "ROLE_" ist eine Spring Security Konvention –
 * hasRole("ADMIN") prüft intern auf "ROLE_ADMIN".
 */
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException(
                "Benutzer nicht gefunden: " + email
            ));

        return org.springframework.security.core.userdetails.User
            .withUsername(user.getEmail())
            .password(user.getPasswordHash())
            .authorities(List.of(
                new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
            ))
            .accountLocked(!user.isActive())
            .build();
    }
}