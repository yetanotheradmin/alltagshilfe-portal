package de.alltagshilfe.backend.dto;

import lombok.Data;

/**
 * Gibt nach erfolgreichem Login die Benutzerdaten zurück.
 * Enthält bewusst KEIN Passwort-Hash – der bleibt immer serverseitig.
 */
@Data
public class UserResponseDto {
    private Long id;
    private String name;
    private String email;
    private String role;
}