package de.alltagshilfe.backend.controller;

import de.alltagshilfe.backend.dto.DashboardDto;
import de.alltagshilfe.backend.entity.RequestStatus;
import de.alltagshilfe.backend.repository.ServiceOfferRepository;
import de.alltagshilfe.backend.repository.ServiceRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Stellt Kennzahlen für das Admin-Dashboard bereit.
 * Nur für eingeloggte Benutzer mit Rolle STAFF oder ADMIN erreichbar
 * (gesichert durch SecurityConfig).
 */
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final ServiceRequestRepository requestRepository;
    private final ServiceOfferRepository serviceOfferRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardDto> getDashboard() {
        DashboardDto dto = new DashboardDto();
        dto.setNewRequests(
            requestRepository.countByStatus(RequestStatus.EINGEGANGEN));
        dto.setInProgressRequests(
            requestRepository.countByStatus(RequestStatus.IN_BEARBEITUNG));
        dto.setCompletedRequests(
            requestRepository.countByStatus(RequestStatus.ABGESCHLOSSEN));
        dto.setActiveServices(
            serviceOfferRepository.findByActiveTrue().size());
        dto.setTotalRequests(
            requestRepository.count());
        return ResponseEntity.ok(dto);
    }
}