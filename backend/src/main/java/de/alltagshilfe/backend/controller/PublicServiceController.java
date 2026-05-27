package de.alltagshilfe.backend.controller;

import de.alltagshilfe.backend.dto.ServiceOfferDto;
import de.alltagshilfe.backend.service.ServiceOfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Stellt Serviceangebote für den öffentlichen Bereich bereit.
 * Gibt nur aktive Angebote zurück.
 */
@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicServiceController {

    private final ServiceOfferService service;

    @GetMapping("/services")
    public ResponseEntity<List<ServiceOfferDto>> getAllServices() {
        return ResponseEntity.ok(service.getAllActive());
    }

    @GetMapping("/services/{id}")
    public ResponseEntity<ServiceOfferDto> getServiceById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }
}
