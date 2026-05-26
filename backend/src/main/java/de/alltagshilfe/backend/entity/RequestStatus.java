package de.alltagshilfe.backend.entity;

/**
 * Mögliche Statuswerte einer Serviceanfrage.
 * Der Status wird durch Administrator:innen im Adminbereich gesetzt.
 */
public enum RequestStatus {
    EINGEGANGEN,
    IN_BEARBEITUNG,
    RUECKFRAGE,
    ABGESCHLOSSEN,
    ABGELEHNT
}
