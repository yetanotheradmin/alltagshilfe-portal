package de.alltagshilfe.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AdminSecurityTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void adminEndpunkt_ohneLogin_istNichtErreichbar() throws Exception {
        mockMvc.perform(get("/api/admin/services"))
                .andExpect(status().isForbidden()); // 403
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void adminEndpunkt_mitAdminRolle_istErreichbar() throws Exception {
        mockMvc.perform(get("/api/admin/services"))
                .andExpect(status().isOk());
    }
}