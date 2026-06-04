package de.alltagshilfe.backend.service;

import de.alltagshilfe.backend.dto.RequestCommentUpdateDto;
import de.alltagshilfe.backend.dto.RequestStatusUpdateDto;
import de.alltagshilfe.backend.dto.ServiceRequestDto;
import de.alltagshilfe.backend.entity.ServiceRequest;
import de.alltagshilfe.backend.repository.ServiceRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminRequestService {

    private final ServiceRequestRepository repository;

    public List<ServiceRequestDto> findAll() {
        return repository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public ServiceRequestDto findById(Long id) {
        return toDto(findEntityById(id));
    }

    public ServiceRequestDto updateStatus(Long id, RequestStatusUpdateDto dto) {
        ServiceRequest r = findEntityById(id);
        r.setStatus(dto.getStatus());
        return toDto(repository.save(r));
    }

    public ServiceRequestDto updateComment(Long id, RequestCommentUpdateDto dto) {
        ServiceRequest r = findEntityById(id);
        r.setAdminComment(dto.getAdminComment());
        return toDto(repository.save(r));
    }

    private ServiceRequest findEntityById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Anfrage nicht gefunden"));
    }

    private ServiceRequestDto toDto(ServiceRequest r) {
        ServiceRequestDto dto = new ServiceRequestDto();
        dto.setId(r.getId());
        dto.setRequestNumber(r.getRequestNumber());
        dto.setServiceTitle(r.getServiceOffer() != null
                ? r.getServiceOffer().getTitle()
                : "—");
        dto.setRequesterName(r.getRequesterName());
        dto.setRequesterEmail(r.getRequesterEmail());
        dto.setRequesterPhone(r.getRequesterPhone());
        dto.setMessage(r.getMessage());
        dto.setPreferredDate(r.getPreferredDate());
        dto.setAccessibilityNeeds(r.getAccessibilityNeeds());
        dto.setStatus(r.getStatus());
        dto.setAdminComment(r.getAdminComment());
        dto.setCreatedAt(r.getCreatedAt());
        dto.setUpdatedAt(r.getUpdatedAt());
        return dto;
    }
}