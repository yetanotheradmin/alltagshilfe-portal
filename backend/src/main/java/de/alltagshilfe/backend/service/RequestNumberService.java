package de.alltagshilfe.backend.service;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Generiert eindeutige Vorgangsnummern für Serviceanfragen.
 * Format: AH-YYYY-XXXXX (z.B. AH-2024-00042)
 *
 * AtomicInteger stellt sicher, dass auch bei gleichzeitigen
 * Anfragen keine doppelten Nummern entstehen.
 */
@Service
public class RequestNumberService {

    private final AtomicInteger counter = new AtomicInteger(1);

    public String generate() {
        String year = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy"));
        String number = String.format("%05d", counter.getAndIncrement());
        return "AH-" + year + "-" + number;
    }
}
