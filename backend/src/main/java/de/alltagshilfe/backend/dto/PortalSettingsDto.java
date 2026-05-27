package de.alltagshilfe.backend.dto;

import lombok.Data;

/**
 * Überträgt die White-Label-Einstellungen an das Frontend.
 * Wird vom öffentlichen Bereich beim Start geladen,
 * um Portalname, Farben und Kontaktdaten anzuzeigen.
 */
@Data
public class PortalSettingsDto {
    private String municipalityName;
    private String portalTitle;
    private String welcomeText;
    private String contactEmail;
    private String contactPhone;
    private String primaryColor;
    private String secondaryColor;
    private String logoUrl;
    private String imprintText;
    private String privacyText;
}
