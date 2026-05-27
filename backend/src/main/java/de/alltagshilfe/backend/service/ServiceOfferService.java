package de.alltagshilfe.backend.service;

import de.alltagshilfe.backend.dto.ServiceOfferDto;
import de.alltagshilfe.backend.entity.ServiceOffer;
import de.alltagshilfe.backend.repository.ServiceOfferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Stellt Serviceangebote für den öffentlichen Bereich bereit.
 * Gibt nur aktive Angebote zurück – deaktivierte sind öffentlich nicht sichtbar.
 */
@Service
@RequiredArgsConstructor
public class ServiceOfferService {

    private final ServiceOfferRepository repository;

    public List<ServiceOfferDto> getAllActive() {
        return repository.findByActiveTrue()
            .stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }

    public ServiceOfferDto getById(Long id) {
        ServiceOffer offer = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Serviceangebot nicht gefunden."));
        return toDto(offer);
    }

    private ServiceOfferDto toDto(ServiceOffer o) {
        ServiceOfferDto dto = new ServiceOfferDto();
        dto.setId(o.getId());
        dto.setTitle(o.getTitle());
        dto.setCategory(o.getCategory());
        dto.setDescription(o.getDescription());
        return dto;
    }
}
