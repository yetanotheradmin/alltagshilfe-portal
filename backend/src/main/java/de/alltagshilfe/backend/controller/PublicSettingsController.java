package de.alltagshilfe.backend.controller;

import de.alltagshilfe.backend.dto.PortalSettingsDto;
import de.alltagshilfe.backend.service.PortalSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Stellt die Portaleinstellungen öffentlich bereit.
 * Wird vom Frontend beim Start geladen, um Portalname,
 * Farben und Kontaktdaten anzuzeigen.
 */
@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicSettingsController {

    private final PortalSettingsService service;

    @GetMapping("/settings")
    public ResponseEntity<PortalSettingsDto> getSettings() {
        return ResponseEntity.ok(service.getSettings());
    }
}
