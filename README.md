# AlltagsHilfe Portal

Barrierefreies White-Label-Serviceportal für kommunale Alltagshilfen.  
Entwickelt im Rahmen der Fallstudie DLBITOWAWBI01.

## Technologiestack

| Bereich   | Technologie                       |
|-----------|-----------------------------------|
| Backend   | Spring Boot, Spring Data JPA      |
| Sicherheit| Spring Security                   |
| Frontend  | React, Material UI, React Router  |
| Datenbank | H2 (Entwicklung), PostgreSQL (Produktion) |

## Voraussetzungen

- Java 21+
- Maven 3.9+
- Node.js 20+
- npm 10+

## Starten

Backend:
```bash
cd backend && ./mvnw spring-boot:run
```


Frontend:

```bash
cd frontend && npm install && npm run dev
```

## Status
In aktiver Entwicklung
