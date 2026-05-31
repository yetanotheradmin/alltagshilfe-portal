package de.alltagshilfe.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * Enthält die Login-Daten die vom Frontend gesendet werden.
 */
@Data
public class LoginRequestDto {

    @NotBlank(message = "E-Mail darf nicht leer sein.")
    @Email(message = "Keine gültige E-Mail-Adresse.")
    private String email;

    @NotBlank(message = "Passwort darf nicht leer sein.")
    private String password;
}