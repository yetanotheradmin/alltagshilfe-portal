package de.alltagshilfe.backend.config;

import de.alltagshilfe.backend.entity.*;
import de.alltagshilfe.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * Wird beim Start der Anwendung automatisch ausgeführt.
 * Legt Demo-Daten an, damit die Anwendung direkt nutzbar ist –
 * Portaleinstellungen, Serviceangebote und einen initialen Admin-User.
 *
 * In einer produktiven Umgebung würden diese Daten aus einer
 * echten Datenbank geladen, nicht hier hartcodiert.
 */
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final PortalSettingsRepository portalSettingsRepository;
    private final ServiceOfferRepository serviceOfferRepository;
    private final UserRepository userRepository;

    /**
     * PasswordEncoder wird von Spring injiziert (definiert in SecurityConfig).
     * Wir erstellen keine eigene Instanz, damit überall derselbe
     * Encoder verwendet wird.
     */
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        initPortalSettings();
        initServiceOffers();
        initAdminUser();
    }

    private void initPortalSettings() {
        PortalSettings settings = new PortalSettings();
        settings.setMunicipalityName("Musterstadt");
        settings.setPortalTitle("AlltagsHilfe Musterstadt");
        settings.setWelcomeText(
            "Willkommen beim AlltagsHilfe-Portal der Stadt Musterstadt. " +
            "Wir helfen Ihnen gerne bei Dingen des täglichen Lebens."
        );
        settings.setContactEmail("hilfe@musterstadt.de");
        settings.setContactPhone("01234 56789");
        settings.setPrimaryColor("#005EA8");
        settings.setSecondaryColor("#FFCC00");
        settings.setImprintText("Stadtverwaltung Musterstadt, Rathausplatz 1, 12345 Musterstadt");
        settings.setPrivacyText("Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.");
        settings.setUpdatedAt(LocalDateTime.now());
        portalSettingsRepository.save(settings);
    }

    private void initServiceOffers() {
        String[][] offers = {
            {"Einkaufshilfe", "Alltag", "Wir helfen beim Einkaufen – ob Lebensmittel oder Besorgungen."},
            {"Begleitung zum Arzt", "Gesundheit", "Begleitung zu Arztterminen und zurück nach Hause."},
            {"Begleitung zu Behörden", "Behörden", "Unterstützung bei Behördengängen und Formularen."},
            {"Medikamentenabholung", "Gesundheit", "Abholung von Rezepten und Medikamenten aus der Apotheke."},
            {"Technikhilfe", "Technik", "Hilfe bei Smartphone, Tablet, Computer oder Smart-TV."},
            {"Nachbarschaftshilfe", "Alltag", "Kleine Alltagshilfen von Nachbar zu Nachbar."},
            {"Hilfe beim Ausfüllen von Formularen", "Behörden", "Unterstützung beim Verstehen und Ausfüllen von Formularen."},
            {"Sonstige Alltagshilfe", "Alltag", "Für alles, was oben nicht aufgeführt ist – sprechen Sie uns an."}
        };

        for (String[] offer : offers) {
            ServiceOffer serviceOffer = new ServiceOffer();
            serviceOffer.setTitle(offer[0]);
            serviceOffer.setCategory(offer[1]);
            serviceOffer.setDescription(offer[2]);
            serviceOffer.setActive(true);
            serviceOfferRepository.save(serviceOffer);
        }
    }

    private void initAdminUser() {
        // Prüfen ob Admin bereits existiert, um doppelte Einträge zu vermeiden
        if (userRepository.findByEmail("admin@musterstadt.de").isEmpty()) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@musterstadt.de");
            // Passwort wird niemals im Klartext gespeichert –
            // BCrypt erzeugt einen sicheren Hash der nicht rückrechenbar ist
            admin.setPasswordHash(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            admin.setActive(true);
            userRepository.save(admin);
        }
    }
}