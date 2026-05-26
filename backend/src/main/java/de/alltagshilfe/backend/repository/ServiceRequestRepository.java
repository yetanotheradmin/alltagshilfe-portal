package de.alltagshilfe.backend.repository;

import de.alltagshilfe.backend.entity.ServiceRequest;
import de.alltagshilfe.backend.entity.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

/**
 * Datenbankzugriff für ServiceRequest.
 * findByRequestNumber() wird für die Bestätigungsseite verwendet,
 * findByStatus() für die gefilterte Ansicht im Adminbereich.
 */
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    Optional<ServiceRequest> findByRequestNumber(String requestNumber);
    List<ServiceRequest> findByStatus(RequestStatus status);
    long countByStatus(RequestStatus status);
}
