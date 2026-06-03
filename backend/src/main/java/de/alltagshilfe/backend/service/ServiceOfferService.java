package de.alltagshilfe.backend.service;

import de.alltagshilfe.backend.dto.ServiceOfferCreateDto;
import de.alltagshilfe.backend.dto.ServiceOfferDto;
import de.alltagshilfe.backend.dto.ServiceOfferUpdateDto;
import de.alltagshilfe.backend.entity.ServiceOffer;
import de.alltagshilfe.backend.repository.ServiceOfferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Stellt Serviceangebote für den öffentlichen und den Admin-Bereich bereit.
 * Öffentlich werden nur aktive Angebote zurückgegeben.
 * Admin-Methoden geben alle Angebote zurück und ermöglichen CRUD-Operationen.
 */
@Service
@RequiredArgsConstructor
public class ServiceOfferService {

    private final ServiceOfferRepository repository;

    // ──────────────────────────────────────────────────────────
    // Öffentliche Methoden (nur aktive Services)
    // ──────────────────────────────────────────────────────────

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

    // ──────────────────────────────────────────────────────────
    // Admin-Methoden (alle Services, CRUD)
    // ──────────────────────────────────────────────────────────

    public List<ServiceOfferDto> findAll() {
        return repository.findAll()
            .stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }

    public ServiceOfferDto findById(Long id) {
        return toDto(findEntityById(id));
    }

    public ServiceOfferDto create(ServiceOfferCreateDto dto) {
        ServiceOffer s = new ServiceOffer();
        s.setTitle(dto.getTitle());
        s.setDescription(dto.getDescription());
        s.setCategory(dto.getCategory());
        s.setActive(dto.isActive());
        return toDto(repository.save(s));
    }

    public ServiceOfferDto update(Long id, ServiceOfferUpdateDto dto) {
        ServiceOffer s = findEntityById(id);
        s.setTitle(dto.getTitle());
        s.setDescription(dto.getDescription());
        s.setCategory(dto.getCategory());
        s.setActive(dto.isActive());
        return toDto(repository.save(s));
    }

    public void delete(Long id) {
        repository.delete(findEntityById(id));
    }

    // ──────────────────────────────────────────────────────────
    // Hilfsmethoden
    // ──────────────────────────────────────────────────────────

    private ServiceOffer findEntityById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Service nicht gefunden"));
    }

    private ServiceOfferDto toDto(ServiceOffer o) {
        ServiceOfferDto dto = new ServiceOfferDto();
        dto.setId(o.getId());
        dto.setTitle(o.getTitle());
        dto.setCategory(o.getCategory());
        dto.setDescription(o.getDescription());
        dto.setActive(o.isActive());
        return dto;
    }
}