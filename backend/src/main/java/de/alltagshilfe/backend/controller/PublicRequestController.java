package de.alltagshilfe.backend.controller;

import de.alltagshilfe.backend.dto.ServiceRequestCreateDto;
import de.alltagshilfe.backend.dto.ServiceRequestResponseDto;
import de.alltagshilfe.backend.service.ServiceRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Nimmt Serviceanfragen von Bürger:innen entgegen.
 * @Valid sorgt dafür, dass die Validierungsregeln aus
 * ServiceRequestCreateDto automatisch geprüft werden.
 */
@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicRequestController {

    private final ServiceRequestService service;

    @PostMapping("/requests")
    public ResponseEntity<ServiceRequestResponseDto> createRequest(
            @Valid @RequestBody ServiceRequestCreateDto dto) {
        return ResponseEntity.ok(service.create(dto));
    }
}
