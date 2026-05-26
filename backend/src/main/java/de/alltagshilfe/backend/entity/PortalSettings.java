package de.alltagshilfe.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

/**
 * Speichert die White-Label-Konfiguration des Portals.
 * Es gibt genau einen Datensatz – die Einstellungen der aktuellen Kommune.
 * Administrator:innen können diese Werte im Adminbereich ändern.
 */
@Entity
@Table(name = "portal_settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortalSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String municipalityName;  // z.B. "Musterstadt"
    private String portalTitle;       // z.B. "AlltagsHilfe Musterstadt"

    @Column(columnDefinition = "TEXT")
    private String welcomeText;

    private String contactEmail;
    private String contactPhone;
    private String primaryColor;      // z.B. "#005EA8"
    private String secondaryColor;    // z.B. "#FFCC00"
    private String logoUrl;

    @Column(columnDefinition = "TEXT")
    private String imprintText;

    @Column(columnDefinition = "TEXT")
    private String privacyText;

    private LocalDateTime updatedAt;

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
