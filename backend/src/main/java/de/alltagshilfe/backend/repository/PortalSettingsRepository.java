package de.alltagshilfe.backend.repository;

import de.alltagshilfe.backend.entity.PortalSettings;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Datenbankzugriff für PortalSettings.
 * Da es immer nur einen Eintrag gibt, wird hauptsächlich
 * findAll().get(0) oder findById(1L) verwendet.
 */
public interface PortalSettingsRepository extends JpaRepository<PortalSettings, Long> {
}
