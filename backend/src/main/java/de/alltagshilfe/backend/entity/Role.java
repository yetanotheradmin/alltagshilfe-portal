package de.alltagshilfe.backend.entity;

/**
 * Definiert die Benutzerrollen im System.
 * - USER:  einfacher Benutzer (aktuell nicht aktiv genutzt)
 * - STAFF: Mitarbeiter, kann Anfragen bearbeiten
 * - ADMIN: voller Zugriff, kann alles verwalten
 */
public enum Role {
    USER,
    STAFF,
    ADMIN
}
