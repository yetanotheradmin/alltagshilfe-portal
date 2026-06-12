# Nutzung

## Demo-Zugänge

| Rolle | E-Mail                        | Passwort |
|-------|-------------------------------|----------|
| Admin | admin@musterstadt.de          | admin123 |
| Staff | maria.schmidt@musterstadt.de  | staff123 |
| Staff | thomas.mueller@musterstadt.de | staff123 |

---

## Öffentlicher Bereich

### Startseite
Unter http://localhost:5173 wird die Startseite mit Portalname,
Begrüßungstext und Kontaktdaten der Kommune angezeigt.

### Serviceangebote ansehen
1. Im Menü auf **Serviceangebote** klicken.
2. Alle aktiven Angebote werden als Karten angezeigt.
3. Klick auf ein Angebot öffnet die Detailseite mit vollständiger Beschreibung.

### Serviceanfrage stellen
1. Im Menü auf **Anfrage stellen** klicken (oder Button auf der Startseite).
2. Formular ausfüllen:
   - Serviceangebot auswählen *(Pflichtfeld)*
   - Name *(Pflichtfeld)*
   - E-Mail *(Pflichtfeld)*
   - Telefonnummer *(optional)*
   - Nachricht *(Pflichtfeld)*
   - Gewünschter Termin *(optional)*
   - Besondere Bedürfnisse *(optional)*
3. **Anfrage absenden** klicken.
4. Bestätigungsseite zeigt die Vorgangsnummer (Format: `AH-YYYY-NNNNN`).

### Barrierefreiheitsfunktionen
Die Toolbar oben auf jeder Seite bietet:

| Funktion | Bedienung |
|---|---|
| Schrift verkleinern | Button **A–** |
| Standardschriftgröße | Button **A** |
| Schrift vergrößern | Button **A+** |
| Hochkontrastmodus | Button **Kontrast: AUS / AN** |

Die gewählten Einstellungen werden im Browser gespeichert und
beim nächsten Besuch wiederhergestellt.

Alle Funktionen sind vollständig per Tastatur bedienbar (Tab / Shift+Tab / Enter / Space).
Ein Skip-Link am Seitenanfang ermöglicht das direkte Springen zum Hauptinhalt.

---

## Adminbereich

### Login
1. http://localhost:5173/login aufrufen.
2. E-Mail und Passwort eingeben (Demo: `admin@musterstadt.de` / `admin123`).
3. Nach erfolgreichem Login Weiterleitung zum Dashboard.

### Dashboard (`/admin`)
Zeigt eine Übersicht der eingegangenen Anfragen und deren Status.

### Serviceangebote verwalten (`/admin/services`)
- **Neues Angebot anlegen:** Button „Neues Angebot" → Formular ausfüllen → Speichern.
- **Angebot bearbeiten:** Stift-Symbol in der Zeile des Angebots.
- **Angebot deaktivieren:** Schalter in der Tabelle — deaktivierte Angebote
  erscheinen im öffentlichen Bereich nicht mehr.

### Anfragen bearbeiten (`/admin/requests`)
- Tabelle zeigt alle eingegangenen Anfragen mit Status und Datum.
- Filterung nach Status möglich.
- Klick auf eine Anfrage öffnet die Detailansicht.
- In der Detailansicht:
  - **Status ändern:** Dropdown (EINGEGANGEN → IN_BEARBEITUNG → RUECKFRAGE → ABGESCHLOSSEN / ABGELEHNT)
  - **Kommentar speichern:** Internes Notizfeld für das Team.

### Benutzer verwalten (`/admin/users`)
- Neue Benutzer anlegen (Name, E-Mail, Passwort, Rolle).
- Rolle ändern: ADMIN, STAFF.
- Benutzer deaktivieren (deaktivierte Benutzer können sich nicht mehr einloggen).

### Portaleinstellungen (`/admin/settings`)
White-Label-Konfiguration der Kommune:
- Portalname und Ortsname
- Begrüßungstext
- Kontakt-E-Mail und Telefonnummer
- Primär- und Sekundärfarbe (Hex-Wert, z. B. `#005EA8`)
- Impressumstext und Datenschutztext

Änderungen sind sofort im öffentlichen Bereich sichtbar.

### Logout
Über den **Logout**-Button in der Navigation. Die Session wird
serverseitig invalidiert — ein erneuter Zugriff auf den Adminbereich
erfordert einen neuen Login.