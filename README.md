# AlltagsHilfe Portal

Barrierefreies White-Label-Serviceportal für kommunale Alltagshilfen.
Bürger:innen können online Unterstützung für den Alltag anfragen –
z. B. Einkaufshilfe, Begleitung zu Arztterminen oder Technikhilfe.

Portalname, Farben und Kontaktdaten sind pro Kommune konfigurierbar,
ohne den Quellcode zu ändern (White-Label).

Entwickelt im Rahmen der Fallstudie DLBITOWAWBI01 –
Programmierung von Web-Anwendungen / webbasierte betriebliche Informationssysteme,
IU Internationale Hochschule.

---

## Funktionen

### Öffentlicher Bereich
- Serviceangebote ansehen und im Detail lesen
- Serviceanfrage online einreichen, Bestätigung mit Vorgangsnummer erhalten
- Schriftgröße individuell anpassen (A– / A / A+)
- Hochkontrastmodus aktivieren
- Vollständige Tastaturbedienung
- Skip-Link für Screenreader
- Responsives Layout (Desktop, Tablet, Smartphone)

### Adminbereich (Login erforderlich)
- Serviceangebote verwalten (erstellen, bearbeiten, deaktivieren)
- Eingehende Anfragen bearbeiten, Status setzen, intern kommentieren
- Benutzer anlegen und Rollen verwalten (ADMIN / STAFF)
- White-Label-Portaleinstellungen ändern (Name, Farben, Kontakt, Impressum)
- Dashboard mit Überblick über offene Anfragen

---

## Technologiestack

| Bereich      | Technologie                                        |
|--------------|----------------------------------------------------|
| Backend      | Spring Boot 3.3, Spring MVC (REST), Spring Data JPA |
| Persistenz   | Hibernate, H2 (Dev), PostgreSQL (Prod)             |
| Sicherheit   | Spring Security (Session-basiert), BCrypt          |
| Validierung  | Jakarta Validation                                 |
| Frontend     | React 18, Material UI (MUI) v5, React Router v6    |
| Build / Dev  | Maven 3.9 · Vite 5                                 |
| Tests        | JUnit 5, Mockito, Spring Boot Test · Vitest, RTL   |

---

## Voraussetzungen

- Java 21+
- Maven 3.9+
- Node.js 20+
- npm 10+

---

## Installation & Start

### Backend
```bash
cd backend
./mvnw spring-boot:run
```
Läuft auf: http://localhost:8080  
H2-Konsole (Entwicklung): http://localhost:8080/h2-console

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Läuft auf: http://localhost:5173

---

## Produktionsbetrieb (PostgreSQL)

Standardmäßig läuft das Backend mit einer H2-In-Memory-Datenbank (siehe oben) –
ideal für Entwicklung und Tests, da bei jedem Start ein reproduzierbarer
Ausgangszustand mit Demo-Daten erzeugt wird.

Für einen Betrieb mit dauerhafter Datenspeicherung steht zusätzlich ein
Spring-Profil `prod` mit PostgreSQL-Anbindung zur Verfügung
(`backend/src/main/resources/application-prod.properties`). Der
PostgreSQL-Treiber ist bereits in der `pom.xml` enthalten.

```bash
# 1. Lokale PostgreSQL-Instanz starten
docker compose up -d

# 2. Backend mit dem Produktionsprofil starten
cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=prod
```

Das Schema wird über `ddl-auto=update` angelegt und bei weiteren Starts
beibehalten; der `DataInitializer` prüft vor dem Anlegen der Demo-Daten,
ob die jeweiligen Datensätze bereits existieren, sodass beim Neustart keine
Duplikate entstehen. Verbindungsparameter lassen sich über die
Umgebungsvariablen `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` und
`DB_PASSWORD` anpassen (Defaults siehe `docker-compose.yml`).

---

## Tests

### Backend
```bash
cd backend
./mvnw test
```
8 Tests in 3 Klassen:
- `PublicApiIntegrationTest` – öffentliche API (Services, Einstellungen, Anfrage erstellen, Validierung)
- `ServiceRequestServiceTest` – Vorgangsnummer und Status EINGEGANGEN
- `AdminSecurityTest` – Zugriffsschutz der Admin-Endpunkte

### Frontend
```bash
cd frontend
npm run test
```
4 Tests in 3 Dateien:
- `HomePage.test.jsx` – Smoke-Test Startseite
- `AccessibilityToolbar.test.jsx` – Toolbar und Kontrast-Button
- `RequestForm.test.jsx` – Absenden-Button vorhanden

---

## Demo-Zugänge

| Rolle | E-Mail                            | Passwort  |
|-------|-----------------------------------|-----------|
| Admin | admin@musterstadt.de              | admin123  |
| Staff | maria.schmidt@musterstadt.de      | staff123  |
| Staff | thomas.mueller@musterstadt.de     | staff123  |

Beim Start werden automatisch Demo-Daten angelegt:
3 Benutzer, 8 Serviceangebote, 5 Anfragen in verschiedenen Status.

---

## Projektstruktur

```
alltagshilfe-portal/
├── backend/                        # Spring Boot
│   └── src/main/
│       ├── java/de/alltagshilfe/backend/
│       │   ├── config/             # Security, CORS, DataInitializer
│       │   ├── controller/         # REST-Controller (public + admin)
│       │   ├── dto/                # Request/Response-DTOs
│       │   ├── entity/             # JPA-Entities
│       │   ├── repository/         # Spring Data Repositories
│       │   └── service/            # Business-Logik
│       └── resources/
│           ├── application.properties       # Dev: H2 In-Memory
│           └── application-prod.properties  # Prod: PostgreSQL
├── frontend/                       # React + MUI
│   └── src/
│       ├── api/                    # Fetch-Funktionen (authApi, serviceApi, …)
│       ├── components/             # Layout, Header, Footer, AccessibilityToolbar, …
│       ├── context/                # AuthContext, SettingsContext
│       ├── pages/                  # Öffentliche Seiten + Admin-Seiten
│       └── test/                   # Vitest-Tests
├── docker-compose.yml              # Lokale PostgreSQL-Instanz (Profil "prod")
└── docs/
    ├── screenshots/
    │   ├── final/                  # Finale UI-Screenshots
    │   ├── accessibility/          # Barrierefreiheits-Screenshots + Lighthouse
    │   └── development/            # Entwicklungsschritte
    ├── setup.md
    └── usage.md
```

---

## Barrierefreiheit

- Lighthouse Accessibility-Audit: **100/100** (Anfrageformular), **100/100** (Startseite)
- Die Umsetzung orientiert sich an zentralen Erfolgskriterien der WCAG 2.1 (Stufe AA):
  Kontrastmodus (1.4.3), Schriftgrößenanpassung (1.4.4), Tastaturbedienung (2.1.1),
  sichtbarer Fokus (2.4.7), Skip-Link (2.4.1), Überschriftenhierarchie (1.3.1),
  Formular-Labels und Fehlermeldungen (1.3.1, 3.3.1). Automatisierte (Lighthouse) und
  manuelle Tastaturtests ergaben in den geprüften Bereichen keine Auffälligkeiten; eine
  förmliche WCAG-Zertifizierung wird nicht behauptet.
- Screenshots: `docs/screenshots/accessibility/`

---

## Screenshots

Finale UI-Screenshots: `docs/screenshots/final/`  
Accessibility-Screenshots inkl. Lighthouse: `docs/screenshots/accessibility/`

| Screenshot | Inhalt |
|---|---|
| `final/01-homepage.png` | Startseite |
| `final/04-request-form.png` | Anfrageformular |
| `final/05-request-success.png` | Bestätigung mit Vorgangsnummer |
| `final/07-admin-dashboard.png` | Admin-Dashboard |
| `final/09b-admin-request-detail.png` | Anfrage bearbeiten |
| `final/11c-white-label-result.png` | White-Label angepasst |
| `final/13-backend-tests-green.png` | Backend-Tests grün |
| `final/14-frontend-tests-green.png` | Frontend-Tests grün |
| `accessibility/03-high-contrast-mode.png` | Hochkontrastmodus |
| `accessibility/08-lighthouse-request-100.png` | Lighthouse 100/100 |

---

## Konfiguration

Portalname, Farben und Kontaktdaten werden im Adminbereich unter
„Portaleinstellungen" gepflegt und sind ohne Code-Änderung anpassbar.

Lokale Backend-Konfiguration (z. B. abweichender Port) in
`backend/src/main/resources/application-local.properties` ablegen
(wird von `.gitignore` ausgeschlossen).

---

## Sicherheitshinweis

Authentifizierung (Spring Security, BCrypt) und die serverseitige
Autorisierung der `/api/admin/**`-Endpunkte sind produktionsreif umgesetzt.
Der CSRF-Schutz ist für die zustandslose JSON-Schnittstelle aktuell
deaktiviert und durch eine restriktive CORS-Konfiguration flankiert –
diese Kombination ist **nur für Entwicklungs- und Demozwecke** gedacht. Für
einen produktiven Betrieb ist die Reaktivierung des CSRF-Schutzes mit einem
tokenbasierten Verfahren erforderlich.