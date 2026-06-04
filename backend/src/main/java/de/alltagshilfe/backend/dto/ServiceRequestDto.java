package de.alltagshilfe.backend.dto;

import de.alltagshilfe.backend.entity.RequestStatus;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ServiceRequestDto {
    private Long id;
    private String requestNumber;
    private String serviceTitle;
    private String requesterName;
    private String requesterEmail;
    private String requesterPhone;
    private String message;
    private LocalDate preferredDate;
    private String accessibilityNeeds;
    private RequestStatus status;
    private String adminComment;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}