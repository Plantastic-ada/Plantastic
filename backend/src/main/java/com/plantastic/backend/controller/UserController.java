package com.plantastic.backend.controller;

import com.plantastic.backend.security.CustomUserDetails;
import com.plantastic.backend.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @DeleteMapping("/delete-me")
    public ResponseEntity<String> deleteCurrentUser(@AuthenticationPrincipal CustomUserDetails user) {
        log.debug("Here is the user : {}", user);
        Long userId = user.getId();
        try {
            userService.deleteUserById(userId);
            log.info("User deleted successfully {}: ", userId);
            return ResponseEntity.ok("User deleted successfully");
        } catch (EntityNotFoundException e) {
            log.warn("User with id {} deletion failed: {}", userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected error deleting user with id {}: ", user.getId(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred");
        }
    }
}
