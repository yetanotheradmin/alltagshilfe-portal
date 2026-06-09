package de.alltagshilfe.backend.dto;

import de.alltagshilfe.backend.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserCreateDto {

    @NotBlank(message = "Name ist erforderlich")
    private String name;

    @NotBlank(message = "E-Mail ist erforderlich")
    @Email(message = "Ungültige E-Mail-Adresse")
    private String email;

    @NotBlank(message = "Passwort ist erforderlich")
    private String password;

    @NotNull(message = "Rolle ist erforderlich")
    private Role role;
}