package de.alltagshilfe.backend.dto;

import de.alltagshilfe.backend.entity.RequestStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RequestStatusUpdateDto {
    @NotNull(message = "Status ist erforderlich")
    private RequestStatus status;
}