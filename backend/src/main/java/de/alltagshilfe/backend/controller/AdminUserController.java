package de.alltagshilfe.backend.controller;

import de.alltagshilfe.backend.dto.UserActiveUpdateDto;
import de.alltagshilfe.backend.dto.UserCreateDto;
import de.alltagshilfe.backend.dto.UserDto;
import de.alltagshilfe.backend.dto.UserRoleUpdateDto;
import de.alltagshilfe.backend.service.AdminUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

    private final AdminUserService adminUserService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(adminUserService.findAll());
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(
            @Valid @RequestBody UserCreateDto dto) {
        return ResponseEntity.ok(adminUserService.create(dto));
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<UserDto> updateRole(
            @PathVariable Long id,
            @Valid @RequestBody UserRoleUpdateDto dto) {
        return ResponseEntity.ok(adminUserService.updateRole(id, dto));
    }

    @PutMapping("/{id}/active")
    public ResponseEntity<UserDto> updateActive(
            @PathVariable Long id,
            @RequestBody UserActiveUpdateDto dto) {
        return ResponseEntity.ok(adminUserService.updateActive(id, dto));
    }
}