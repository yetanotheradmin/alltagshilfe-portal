package de.alltagshilfe.backend.dto;

import lombok.Data;

/**
 * Wird nach erfolgreicher Erstellung einer Anfrage zurückgegeben.
 * Enthält die Vorgangsnummer, die der Bürger / die Bürgerin
 * zur späteren Nachverfolgung verwenden kann.
 */
@Data
public class ServiceRequestResponseDto {
    private String requestNumber;
    private String status;
    private String message; // Bestätigungstext für die Erfolgsseite
}
