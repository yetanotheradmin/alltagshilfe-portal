# Setup

## Voraussetzungen

| Tool    | Mindestversion |
|---------|----------------|
| Java    | 21             |
| Maven   | 3.9            |
| Node.js | 20             |
| npm     | 10             |

Java-Version prüfen:
```bash
java -version
```

Node-Version prüfen:
```bash
node -v && npm -v
```

---

## Repository klonen

```bash
git clone https://github.com/<DEIN-USERNAME>/alltagshilfe-portal.git
cd alltagshilfe-portal
```

---

## Backend starten

```bash
cd backend
./mvnw spring-boot:run
```

- API: http://localhost:8080
- H2-Konsole (Entwicklung): http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:alltagshilfe`
  - User: `sa`, Passwort: *(leer lassen)*

Beim Start werden automatisch Demo-Daten angelegt
(Portaleinstellungen, 8 Serviceangebote, 3 Benutzer, 5 Anfragen).

---

## Frontend starten

```bash
cd frontend
npm install
npm run dev
```

- Anwendung: http://localhost:5173

> Backend muss laufen bevor das Frontend gestartet wird,
> da beim ersten Laden Portaleinstellungen vom Backend abgerufen werden.

---

## Tests ausführen

### Backend
```bash
cd backend
./mvnw test
```
Erwartung: `Tests run: 8, Failures: 0, Errors: 0`

### Frontend
```bash
cd frontend
npm run test
```
Erwartung: `Tests 4 passed (4)`

---

## Lokale Konfiguration (optional)

Für abweichende Einstellungen (z. B. anderen Port) eine Datei
`backend/src/main/resources/application-local.properties` anlegen:

```properties
server.port=8081
```

Diese Datei ist in `.gitignore` eingetragen und wird nicht ins Repository übernommen.

---

## Hinweise zur Datenbank

Die Entwicklungsumgebung nutzt H2 (In-Memory). Die Datenbank wird bei
jedem Neustart des Backends zurückgesetzt und neu befüllt.
Manuell angelegte Daten gehen beim Neustart verloren.

Für persistente Daten (Produktion) PostgreSQL konfigurieren:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/alltagshilfe
spring.datasource.username=<USER>
spring.datasource.password=<PASSWORT>
spring.jpa.hibernate.ddl-auto=update
```