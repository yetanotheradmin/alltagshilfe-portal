package de.alltagshilfe.backend.controller;

import de.alltagshilfe.backend.dto.PortalSettingsDto;
import de.alltagshilfe.backend.service.AdminSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/settings")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminSettingsController {

    private final AdminSettingsService adminSettingsService;

    @GetMapping
    public ResponseEntity<PortalSettingsDto> getSettings() {
        return ResponseEntity.ok(adminSettingsService.getSettings());
    }

    @PutMapping
    public ResponseEntity<PortalSettingsDto> updateSettings(
            @RequestBody PortalSettingsDto dto) {
        return ResponseEntity.ok(adminSettingsService.updateSettings(dto));
    }
}