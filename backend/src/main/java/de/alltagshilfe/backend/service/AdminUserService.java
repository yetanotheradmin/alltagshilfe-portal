package de.alltagshilfe.backend.service;

import de.alltagshilfe.backend.dto.UserActiveUpdateDto;
import de.alltagshilfe.backend.dto.UserCreateDto;
import de.alltagshilfe.backend.dto.UserDto;
import de.alltagshilfe.backend.dto.UserRoleUpdateDto;
import de.alltagshilfe.backend.entity.User;
import de.alltagshilfe.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserDto> findAll() {
        return userRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public UserDto create(UserCreateDto dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "E-Mail bereits vergeben");
        }
        User u = new User();
        u.setName(dto.getName());
        u.setEmail(dto.getEmail());
        u.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        u.setRole(dto.getRole());
        u.setActive(true);
        return toDto(userRepository.save(u));
    }

    public UserDto updateRole(Long id, UserRoleUpdateDto dto) {
        User u = findEntityById(id);
        u.setRole(dto.getRole());
        return toDto(userRepository.save(u));
    }

    public UserDto updateActive(Long id, UserActiveUpdateDto dto) {
        User u = findEntityById(id);
        u.setActive(dto.isActive());
        return toDto(userRepository.save(u));
    }

    private User findEntityById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Benutzer nicht gefunden"));
    }

    private UserDto toDto(User u) {
        UserDto dto = new UserDto();
        dto.setId(u.getId());
        dto.setName(u.getName());
        dto.setEmail(u.getEmail());
        dto.setRole(u.getRole());
        dto.setActive(u.isActive());
        dto.setCreatedAt(u.getCreatedAt());
        return dto;
    }
}