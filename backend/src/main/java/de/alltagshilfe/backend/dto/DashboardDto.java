package de.alltagshilfe.backend.dto;

import lombok.Data;

/**
 * Enthält die Kennzahlen für das Admin-Dashboard.
 * Wird beim Laden des Dashboards einmalig vom Backend abgerufen.
 */
@Data
public class DashboardDto {
    private long newRequests;
    private long inProgressRequests;
    private long completedRequests;
    private long activeServices;
    private long totalRequests;
}