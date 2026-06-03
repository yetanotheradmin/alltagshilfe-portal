package de.alltagshilfe.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ServiceOfferCreateDto {

    @NotBlank(message = "Titel ist erforderlich")
    private String title;

    @NotBlank(message = "Beschreibung ist erforderlich")
    private String description;

    private String category;

    private boolean active = true;
}