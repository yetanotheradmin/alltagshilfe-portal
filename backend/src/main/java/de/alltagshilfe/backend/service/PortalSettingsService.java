package de.alltagshilfe.backend.service;

import de.alltagshilfe.backend.dto.PortalSettingsDto;
import de.alltagshilfe.backend.entity.PortalSettings;
import de.alltagshilfe.backend.repository.PortalSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Lädt die Portaleinstellungen aus der Datenbank
 * und wandelt sie in ein DTO um, das an das Frontend gesendet wird.
 */
@Service
@RequiredArgsConstructor
public class PortalSettingsService {

    private final PortalSettingsRepository repository;

    public PortalSettingsDto getSettings() {
        PortalSettings settings = repository.findAll()
            .stream()
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Keine Portaleinstellungen gefunden."));
        return toDto(settings);
    }

    // Wandelt eine Entity in ein DTO um – so werden interne
    // Datenbankfelder nicht versehentlich nach außen gegeben.
    private PortalSettingsDto toDto(PortalSettings s) {
        PortalSettingsDto dto = new PortalSettingsDto();
        dto.setMunicipalityName(s.getMunicipalityName());
        dto.setPortalTitle(s.getPortalTitle());
        dto.setWelcomeText(s.getWelcomeText());
        dto.setContactEmail(s.getContactEmail());
        dto.setContactPhone(s.getContactPhone());
        dto.setPrimaryColor(s.getPrimaryColor());
        dto.setSecondaryColor(s.getSecondaryColor());
        dto.setLogoUrl(s.getLogoUrl());
        dto.setImprintText(s.getImprintText());
        dto.setPrivacyText(s.getPrivacyText());
        return dto;
    }
}
