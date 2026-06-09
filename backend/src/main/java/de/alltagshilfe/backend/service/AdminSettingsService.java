package de.alltagshilfe.backend.service;

import de.alltagshilfe.backend.dto.PortalSettingsDto;
import de.alltagshilfe.backend.entity.PortalSettings;
import de.alltagshilfe.backend.repository.PortalSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AdminSettingsService {

    private final PortalSettingsRepository repository;

    public PortalSettingsDto getSettings() {
        return toDto(findEntity());
    }

    public PortalSettingsDto updateSettings(PortalSettingsDto dto) {
        PortalSettings s = findEntity();
        s.setMunicipalityName(dto.getMunicipalityName());
        s.setPortalTitle(dto.getPortalTitle());
        s.setWelcomeText(dto.getWelcomeText());
        s.setContactEmail(dto.getContactEmail());
        s.setContactPhone(dto.getContactPhone());
        s.setPrimaryColor(dto.getPrimaryColor());
        s.setSecondaryColor(dto.getSecondaryColor());
        s.setLogoUrl(dto.getLogoUrl());
        s.setImprintText(dto.getImprintText());
        s.setPrivacyText(dto.getPrivacyText());
        return toDto(repository.save(s));
    }

    private PortalSettings findEntity() {
        return repository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Portaleinstellungen nicht gefunden"));
    }

    private PortalSettingsDto toDto(PortalSettings s) {
        PortalSettingsDto dto = new PortalSettingsDto();
        dto.setId(s.getId());
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