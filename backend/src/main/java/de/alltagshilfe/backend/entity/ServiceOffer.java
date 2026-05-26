package de.alltagshilfe.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

/**
 * Repräsentiert ein einzelnes Serviceangebot der Kommune,
 * z.B. "Einkaufshilfe" oder "Begleitung zum Arzt".
 * Deaktivierte Angebote erscheinen im öffentlichen Bereich nicht mehr.
 */
@Entity
@Table(name = "service_offers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    private boolean active = true;  // neu angelegte Angebote sind standardmäßig aktiv

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
