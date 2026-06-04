package de.alltagshilfe.backend.controller;

import de.alltagshilfe.backend.dto.RequestCommentUpdateDto;
import de.alltagshilfe.backend.dto.RequestStatusUpdateDto;
import de.alltagshilfe.backend.dto.ServiceRequestDto;
import de.alltagshilfe.backend.service.AdminRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/requests")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminRequestController {

    private final AdminRequestService adminRequestService;

    @GetMapping
    public ResponseEntity<List<ServiceRequestDto>> getAllRequests() {
        return ResponseEntity.ok(adminRequestService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceRequestDto> getRequestById(@PathVariable Long id) {
        return ResponseEntity.ok(adminRequestService.findById(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ServiceRequestDto> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody RequestStatusUpdateDto dto) {
        return ResponseEntity.ok(adminRequestService.updateStatus(id, dto));
    }

    @PutMapping("/{id}/comment")
    public ResponseEntity<ServiceRequestDto> updateComment(
            @PathVariable Long id,
            @RequestBody RequestCommentUpdateDto dto) {
        return ResponseEntity.ok(adminRequestService.updateComment(id, dto));
    }
}