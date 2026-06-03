package de.alltagshilfe.backend.dto;

import lombok.Data;

/**
 * Überträgt ein einzelnes Serviceangebot an das Frontend.
 * Nur aktive Angebote werden über die öffentliche API ausgeliefert.
 * Das Feld {@code active} wird im Admin-Bereich zur Statusanzeige genutzt.
 */
@Data
public class ServiceOfferDto {
    private Long id;
    private String title;
    private String category;
    private String description;
    private boolean active;
}