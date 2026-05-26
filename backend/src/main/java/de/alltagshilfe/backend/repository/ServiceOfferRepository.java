package de.alltagshilfe.backend.repository;

import de.alltagshilfe.backend.entity.ServiceOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Datenbankzugriff für ServiceOffer.
 * findByActiveTrue() gibt nur aktive Angebote zurück –
 * wird für den öffentlichen Bereich verwendet.
 */
public interface ServiceOfferRepository extends JpaRepository<ServiceOffer, Long> {
    List<ServiceOffer> findByActiveTrue();
}
