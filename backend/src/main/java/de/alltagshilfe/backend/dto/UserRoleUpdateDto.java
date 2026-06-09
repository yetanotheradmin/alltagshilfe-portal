package de.alltagshilfe.backend.dto;

import de.alltagshilfe.backend.entity.Role;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserRoleUpdateDto {
    @NotNull(message = "Rolle ist erforderlich")
    private Role role;
}