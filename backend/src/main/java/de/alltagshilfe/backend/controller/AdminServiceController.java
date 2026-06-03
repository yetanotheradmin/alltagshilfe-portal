package de.alltagshilfe.backend.controller;

import de.alltagshilfe.backend.dto.ServiceOfferCreateDto;
import de.alltagshilfe.backend.dto.ServiceOfferDto;
import de.alltagshilfe.backend.dto.ServiceOfferUpdateDto;
import de.alltagshilfe.backend.service.ServiceOfferService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/services")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminServiceController {

    private final ServiceOfferService serviceOfferService;

    @GetMapping
    public ResponseEntity<List<ServiceOfferDto>> getAllServices() {
        return ResponseEntity.ok(serviceOfferService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceOfferDto> getServiceById(@PathVariable Long id) {
        return ResponseEntity.ok(serviceOfferService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ServiceOfferDto> createService(
            @Valid @RequestBody ServiceOfferCreateDto dto) {
        return ResponseEntity.ok(serviceOfferService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceOfferDto> updateService(
            @PathVariable Long id,
            @Valid @RequestBody ServiceOfferUpdateDto dto) {
        return ResponseEntity.ok(serviceOfferService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceOfferService.delete(id);
        return ResponseEntity.noContent().build();
    }
}