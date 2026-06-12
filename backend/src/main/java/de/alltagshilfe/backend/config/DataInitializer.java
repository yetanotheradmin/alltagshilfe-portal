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
 * Portaleinstellungen, Serviceangebote, Benutzer und Beispielanfragen.
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
    private final ServiceRequestRepository serviceRequestRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        initPortalSettings();
        initServiceOffers();
        initUsers();
        initServiceRequests();
    }

    private void initPortalSettings() {
        PortalSettings settings = new PortalSettings();
        settings.setMunicipalityName("Musterstadt");
        settings.setPortalTitle("AlltagsHilfe Musterstadt");
        settings.setWelcomeText(
                "Willkommen beim AlltagsHilfe-Portal der Stadt Musterstadt. " +
                        "Wir helfen Ihnen gerne bei Dingen des täglichen Lebens.");
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
                { "Einkaufshilfe", "Alltag",
                        "Wir helfen beim Einkaufen – ob Lebensmittel, Drogerie oder sonstige Besorgungen. " +
                                "Unsere Helfer:innen kommen zu Ihnen nach Hause, nehmen Ihre Einkaufsliste entgegen " +
                                "und bringen alles direkt zu Ihnen." },
                { "Begleitung zum Arzt", "Gesundheit",
                        "Begleitung zu Arztterminen und sicher zurück nach Hause. " +
                                "Wir sind für Sie da – von der Haustür bis ins Wartezimmer und wieder zurück." },
                { "Begleitung zu Behörden", "Behörden",
                        "Unterstützung bei Behördengängen, Ämtern und Formularen. " +
                                "Unsere Helfer:innen begleiten Sie und helfen beim Verstehen von Bescheiden." },
                { "Medikamentenabholung", "Gesundheit",
                        "Abholung von Rezepten und Medikamenten aus der Apotheke. " +
                                "Schnell, zuverlässig und direkt zu Ihnen nach Hause geliefert." },
                { "Technikhilfe", "Technik",
                        "Hilfe bei Smartphone, Tablet, Computer oder Smart-TV. " +
                                "Ob WhatsApp einrichten, Fotos übertragen oder Video-Anrufe – " +
                                "wir erklären alles in Ihrem eigenen Tempo." },
                { "Vorleseservice", "Alltag",
                        "Vorlesen von Briefen, Behördenschreiben oder Büchern. " +
                                "Für Menschen mit Sehbeeinträchtigungen oder die einfach gerne zuhören." },
                { "Hilfe beim Ausfüllen von Formularen", "Behörden",
                        "Unterstützung beim Verstehen und Ausfüllen von Anträgen, Formularen und Briefen. " +
                                "Wir nehmen uns Zeit und erklären jeden Schritt verständlich." },
                { "Sonstige Alltagshilfe", "Alltag",
                        "Für alles, was oben nicht aufgeführt ist – sprechen Sie uns einfach an. " +
                                "Wir finden gemeinsam eine Lösung." }
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

    private void initUsers() {
        if (userRepository.findByEmail("admin@musterstadt.de").isEmpty()) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@musterstadt.de");
            admin.setPasswordHash(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            admin.setActive(true);
            userRepository.save(admin);
        }

        if (userRepository.findByEmail("maria.schmidt@musterstadt.de").isEmpty()) {
            User staff1 = new User();
            staff1.setName("Maria Schmidt");
            staff1.setEmail("maria.schmidt@musterstadt.de");
            staff1.setPasswordHash(passwordEncoder.encode("staff123"));
            staff1.setRole(Role.STAFF);
            staff1.setActive(true);
            userRepository.save(staff1);
        }

        if (userRepository.findByEmail("thomas.mueller@musterstadt.de").isEmpty()) {
            User staff2 = new User();
            staff2.setName("Thomas Müller");
            staff2.setEmail("thomas.mueller@musterstadt.de");
            staff2.setPasswordHash(passwordEncoder.encode("staff123"));
            staff2.setRole(Role.STAFF);
            staff2.setActive(true);
            userRepository.save(staff2);
        }
    }

    private void initServiceRequests() {
        if (serviceRequestRepository.count() > 0)
            return;

        ServiceOffer einkauf = serviceOfferRepository.findAll().get(0);
        ServiceOffer arzt = serviceOfferRepository.findAll().get(1);
        ServiceOffer technik = serviceOfferRepository.findAll().get(4);
        ServiceOffer formular = serviceOfferRepository.findAll().get(6);

        // Anfrage 1 – neu eingegangen
        ServiceRequest r1 = new ServiceRequest();
        r1.setRequestNumber("AH-2024-00001");
        r1.setServiceOffer(einkauf);
        r1.setRequesterName("Hildegard Bremer");
        r1.setRequesterEmail("h.bremer@example.de");
        r1.setRequesterPhone("01234 111222");
        r1.setMessage(
                "Ich benötige wöchentlich Hilfe beim Lebensmitteleinkauf, " +
                        "da ich nicht mehr gut zu Fuß bin. Am liebsten dienstags oder donnerstags.");
        r1.setStatus(RequestStatus.EINGEGANGEN);
        serviceRequestRepository.save(r1);

        // Anfrage 2 – in Bearbeitung
        ServiceRequest r2 = new ServiceRequest();
        r2.setRequestNumber("AH-2024-00002");
        r2.setServiceOffer(arzt);
        r2.setRequesterName("Werner Hoffmann");
        r2.setRequesterEmail("w.hoffmann@example.de");
        r2.setRequesterPhone("01234 333444");
        r2.setMessage(
                "Ich habe am 15. nächsten Monats einen Termin beim Kardiologen " +
                        "und bitte um Begleitung. Der Termin ist um 10:30 Uhr.");
        r2.setStatus(RequestStatus.IN_BEARBEITUNG);
        r2.setAdminComment("Maria Schmidt übernimmt die Begleitung – Rückruf an Herrn Hoffmann erfolgt.");
        serviceRequestRepository.save(r2);

        // Anfrage 3 – Rückfrage
        ServiceRequest r3 = new ServiceRequest();
        r3.setRequestNumber("AH-2024-00003");
        r3.setServiceOffer(technik);
        r3.setRequesterName("Gertrude Lange");
        r3.setRequesterEmail("g.lange@example.de");
        r3.setMessage(
                "Mein neues Smartphone macht mir Probleme. " +
                        "Ich komme mit WhatsApp und der Kamera nicht zurecht.");
        r3.setStatus(RequestStatus.RUECKFRAGE);
        r3.setAdminComment(
                "Welches Gerät und welches Betriebssystem? " +
                        "Bitte Rückmeldung damit wir den richtigen Helfer schicken können.");
        serviceRequestRepository.save(r3);

        // Anfrage 4 – abgeschlossen
        ServiceRequest r4 = new ServiceRequest();
        r4.setRequestNumber("AH-2024-00004");
        r4.setServiceOffer(formular);
        r4.setRequesterName("Klaus Bauer");
        r4.setRequesterEmail("k.bauer@example.de");
        r4.setMessage(
                "Ich verstehe den Rentenantrag nicht und brauche Hilfe beim Ausfüllen.");
        r4.setAccessibilityNeeds("Starke Sehbeeinträchtigung – bitte große Schrift verwenden.");
        r4.setStatus(RequestStatus.ABGESCHLOSSEN);
        r4.setAdminComment(
                "Thomas Müller war am 10.06. vor Ort. Antrag vollständig ausgefüllt und abgeschickt. " +
                        "Herr Bauer sehr zufrieden.");
        serviceRequestRepository.save(r4);

        // Anfrage 5 – abgelehnt
        ServiceRequest r5 = new ServiceRequest();
        r5.setRequestNumber("AH-2024-00005");
        r5.setServiceOffer(einkauf);
        r5.setRequesterName("Sandra Klein");
        r5.setRequesterEmail("s.klein@example.de");
        r5.setMessage(
                "Ich brauche jemanden der täglich für mich einkauft und kocht.");
        r5.setStatus(RequestStatus.ABGELEHNT);
        r5.setAdminComment(
                "Leider außerhalb unseres Leistungsumfangs. " +
                        "Frau Klein wurde an den Pflegedienst Sonnenschein weitergeleitet.");
        serviceRequestRepository.save(r5);
    }
}