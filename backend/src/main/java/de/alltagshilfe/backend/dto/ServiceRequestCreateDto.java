package de.alltagshilfe.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

/**
 * Enthält die Daten, die ein Bürger / eine Bürgerin beim
 * Absenden des Anfrageformulars übermittelt.
 * Die Validierungsannotationen stellen sicher, dass
 * Pflichtfelder ausgefüllt und Formate korrekt sind.
 */
@Data
public class ServiceRequestCreateDto {

    @NotNull(message = "Bitte wählen Sie ein Serviceangebot aus.")
    private Long serviceOfferId;

    @NotBlank(message = "Bitte geben Sie Ihren Namen ein.")
    @Size(max = 100, message = "Der Name darf maximal 100 Zeichen lang sein.")
    private String requesterName;

    @NotBlank(message = "Bitte geben Sie Ihre E-Mail-Adresse ein.")
    @Email(message = "Bitte geben Sie eine gültige E-Mail-Adresse ein.")
    private String requesterEmail;

    private String requesterPhone; // optional

    @NotBlank(message = "Bitte beschreiben Sie Ihr Anliegen.")
    @Size(max = 1000, message = "Die Beschreibung darf maximal 1000 Zeichen lang sein.")
    private String message;

    private String preferredDate;    // optional, Format: YYYY-MM-DD
    private String accessibilityNeeds; // optional
}
