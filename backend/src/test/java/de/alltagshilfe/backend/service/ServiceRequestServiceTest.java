package de.alltagshilfe.backend.service;

import de.alltagshilfe.backend.dto.ServiceRequestCreateDto;
import de.alltagshilfe.backend.dto.ServiceRequestResponseDto;
import de.alltagshilfe.backend.entity.RequestStatus;
import de.alltagshilfe.backend.entity.ServiceOffer;
import de.alltagshilfe.backend.repository.ServiceOfferRepository;
import de.alltagshilfe.backend.repository.ServiceRequestRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ServiceRequestServiceTest {

    @Mock
    ServiceRequestRepository requestRepository;
    @Mock
    ServiceOfferRepository offerRepository;
    @Mock
    RequestNumberService requestNumberService;

    @InjectMocks
    ServiceRequestService service;

    @Test
    void create_setztStatusEingegangenUndErzeugtVorgangsnummer() {
        ServiceOffer offer = new ServiceOffer();
        offer.setId(1L);

        when(offerRepository.findById(1L)).thenReturn(Optional.of(offer));
        when(requestNumberService.generate()).thenReturn("AH-2024-00001");

        ServiceRequestCreateDto dto = new ServiceRequestCreateDto();
        dto.setServiceOfferId(1L);
        dto.setRequesterName("Erika Mustermann");
        dto.setRequesterEmail("erika@example.de");
        dto.setMessage("Bitte um Unterstützung.");

        ServiceRequestResponseDto response = service.create(dto);

        assertThat(response.getRequestNumber()).isEqualTo("AH-2024-00001");
        assertThat(response.getStatus()).isEqualTo(RequestStatus.EINGEGANGEN.name());
        verify(requestRepository).save(any());
    }
}