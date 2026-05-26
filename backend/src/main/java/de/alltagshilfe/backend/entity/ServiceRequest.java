package de.alltagshilfe.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Speichert eine Serviceanfrage eines Bürgers / einer Bürgerin.
 * Jede Anfrage erhält eine eindeutige Vorgangsnummer (requestNumber),
 * über die sie später nachverfolgt werden kann.
 */
@Entity
@Table(name = "service_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String requestNumber;       // z.B. "AH-2024-00042"

    @ManyToOne
    @JoinColumn(name = "service_offer_id")
    private ServiceOffer serviceOffer;  // welches Serviceangebot wurde angefragt

    private String requesterName;
    private String requesterEmail;
    private String requesterPhone;      // optional

    @Column(columnDefinition = "TEXT")
    private String message;

    private LocalDate preferredDate;    // gewünschter Termin, optional

    @Column(columnDefinition = "TEXT")
    private String accessibilityNeeds; // besondere Bedürfnisse, optional

    @Enumerated(EnumType.STRING)
    private RequestStatus status = RequestStatus.EINGEGANGEN;

    @Column(columnDefinition = "TEXT")
    private String adminComment;       // interner Kommentar für das Admin-Team

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
