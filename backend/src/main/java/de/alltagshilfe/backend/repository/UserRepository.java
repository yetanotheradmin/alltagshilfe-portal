package de.alltagshilfe.backend.repository;

import de.alltagshilfe.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * Datenbankzugriff für User.
 * findByEmail() wird beim Login verwendet,
 * um den Benutzer anhand der eingegebenen E-Mail zu finden.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
