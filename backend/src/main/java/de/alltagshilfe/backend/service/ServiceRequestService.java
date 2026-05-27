package de.alltagshilfe.backend.service;

import de.alltagshilfe.backend.dto.ServiceRequestCreateDto;
import de.alltagshilfe.backend.dto.ServiceRequestResponseDto;
import de.alltagshilfe.backend.entity.ServiceOffer;
import de.alltagshilfe.backend.entity.ServiceRequest;
import de.alltagshilfe.backend.entity.RequestStatus;
import de.alltagshilfe.backend.repository.ServiceOfferRepository;
import de.alltagshilfe.backend.repository.ServiceRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

/**
 * Verarbeitet eingehende Serviceanfragen.
 * Weist jeder neuen Anfrage eine eindeutige Vorgangsnummer zu
 * und setzt den initialen Status auf EINGEGANGEN.
 */
@Service
@RequiredArgsConstructor
public class ServiceRequestService {

    private final ServiceRequestRepository requestRepository;
    private final ServiceOfferRepository offerRepository;
    private final RequestNumberService requestNumberService;

    public ServiceRequestResponseDto create(ServiceRequestCreateDto dto) {

        // Serviceangebot aus der Datenbank laden
        ServiceOffer offer = offerRepository.findById(dto.getServiceOfferId())
            .orElseThrow(() -> new RuntimeException("Serviceangebot nicht gefunden."));

        // Neue Anfrage zusammenbauen
        ServiceRequest request = new ServiceRequest();
        request.setRequestNumber(requestNumberService.generate());
        request.setServiceOffer(offer);
        request.setRequesterName(dto.getRequesterName());
        request.setRequesterEmail(dto.getRequesterEmail());
        request.setRequesterPhone(dto.getRequesterPhone());
        request.setMessage(dto.getMessage());
        request.setAccessibilityNeeds(dto.getAccessibilityNeeds());
        request.setStatus(RequestStatus.EINGEGANGEN);

        // Wunschdatum parsen falls angegeben
        if (dto.getPreferredDate() != null && !dto.getPreferredDate().isBlank()) {
            request.setPreferredDate(LocalDate.parse(dto.getPreferredDate()));
        }

        requestRepository.save(request);

        // Bestätigung zurückgeben
        ServiceRequestResponseDto response = new ServiceRequestResponseDto();
        response.setRequestNumber(request.getRequestNumber());
        response.setStatus(request.getStatus().name());
        response.setMessage("Ihre Anfrage wurde erfolgreich eingereicht. " +
            "Ihre Vorgangsnummer lautet: " + request.getRequestNumber());
        return response;
    }
}
