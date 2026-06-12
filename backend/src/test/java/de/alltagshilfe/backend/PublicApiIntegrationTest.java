package de.alltagshilfe.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.alltagshilfe.backend.dto.ServiceRequestCreateDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class PublicApiIntegrationTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;

    @Test
    void getServices_liefertOk() throws Exception {
        mockMvc.perform(get("/api/public/services"))
                .andExpect(status().isOk());
    }

    @Test
    void getSettings_liefertOk() throws Exception {
        mockMvc.perform(get("/api/public/settings"))
                .andExpect(status().isOk());
    }

    @Test
    void createRequest_gueltigeDaten_liefertVorgangsnummerUndStatus() throws Exception {
        // Annahme: in den Demo-/Seed-Daten existiert ein ServiceOffer mit id 1.
        // Falls deine Seed-IDs anders sind, hier die passende ID eintragen.
        ServiceRequestCreateDto dto = new ServiceRequestCreateDto();
        dto.setServiceOfferId(1L);
        dto.setRequesterName("Erika Mustermann");
        dto.setRequesterEmail("erika@example.de");
        dto.setMessage("Ich benötige Unterstützung beim Einkaufen.");

        mockMvc.perform(post("/api/public/requests")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk()) // siehe Hinweis A
                .andExpect(jsonPath("$.requestNumber").exists())
                .andExpect(jsonPath("$.status").value("EINGEGANGEN"));
    }

    @Test
    void createRequest_ungueltigeDaten_liefertBadRequest() throws Exception {
        // leeres DTO verletzt @NotBlank / @Email / @NotNull → 400
        ServiceRequestCreateDto dto = new ServiceRequestCreateDto();
        mockMvc.perform(post("/api/public/requests")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest());
    }
}