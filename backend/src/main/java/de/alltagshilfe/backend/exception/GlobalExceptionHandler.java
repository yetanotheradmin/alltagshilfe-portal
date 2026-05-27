package de.alltagshilfe.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/**
 * Fängt Exceptions aus allen Controllern zentral ab und
 * wandelt sie in verständliche HTTP-Antworten um.
 *
 * Ohne diese Klasse würde Spring bei Fehlern einen
 * unstrukturierten Stacktrace zurückgeben – das Frontend
 * könnte damit nichts anfangen.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Wird aufgerufen wenn @Valid eine Validierung fehlschlägt.
     * Gibt alle Feldfehler als Map zurück, z.B.:
     * { "requesterEmail": "Bitte geben Sie eine gültige E-Mail-Adresse ein." }
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    /**
     * Wird aufgerufen wenn eine Ressource nicht gefunden wurde,
     * z.B. ein Serviceangebot mit unbekannter ID.
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(
            RuntimeException ex) {

        Map<String, String> error = new HashMap<>();
        error.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
}
