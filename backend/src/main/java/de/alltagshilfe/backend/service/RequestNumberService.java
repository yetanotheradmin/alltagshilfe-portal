package de.alltagshilfe.backend.service;

import de.alltagshilfe.backend.entity.ServiceRequest;
import de.alltagshilfe.backend.repository.ServiceRequestRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Generiert eindeutige Vorgangsnummern für Serviceanfragen.
 * Format: AH-YYYY-XXXXX (z.B. AH-2024-00042)
 *
 * Der Zaehler wird beim Start anhand der bereits in der Datenbank
 * vorhandenen Vorgangsnummern des aktuellen Jahres initialisiert.
 * Andernfalls wuerde er bei jedem Neustart wieder bei 1 beginnen und
 * mit bereits persistierten Nummern kollidieren (siehe Reflexion zur
 * Persistenz im Projektbericht).
 *
 * generate() ist synchronized: Das ersetzt den vorherigen
 * AtomicInteger und stellt weiterhin sicher, dass auch bei
 * gleichzeitigen Anfragen keine doppelten Nummern entstehen.
 */
@Service
public class RequestNumberService {

    private static final DateTimeFormatter YEAR_FORMAT = DateTimeFormatter.ofPattern("yyyy");

    private String trackedYear;
    private int counter;

    public RequestNumberService(ServiceRequestRepository requestRepository) {
        this.trackedYear = currentYear();
        String yearPrefix = "AH-" + trackedYear + "-";

        int highestExisting = requestRepository.findAll().stream()
                .map(ServiceRequest::getRequestNumber)
                .filter(number -> number != null && number.startsWith(yearPrefix))
                .map(number -> number.substring(yearPrefix.length()))
                .mapToInt(suffix -> {
                    try {
                        return Integer.parseInt(suffix);
                    } catch (NumberFormatException e) {
                        return 0;
                    }
                })
                .max()
                .orElse(0);

        this.counter = highestExisting + 1;
    }

    public synchronized String generate() {
        String year = currentYear();
        if (!year.equals(trackedYear)) {
            // Jahreswechsel waehrend die Anwendung laeuft:
            // Zaehler fuer das neue Jahr von vorn beginnen.
            trackedYear = year;
            counter = 1;
        }
        String number = String.format("%05d", counter++);
        return "AH-" + year + "-" + number;
    }

    private static String currentYear() {
        return LocalDateTime.now().format(YEAR_FORMAT);
    }
}