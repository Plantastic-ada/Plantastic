package com.plantastic.backend.controller;

import com.plantastic.backend.security.user.CustomUserDetails;
import com.plantastic.backend.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
    public ResponseEntity<String> deleteCurrentUser(@AuthenticationPrincipal CustomUserDetails user, HttpServletRequest request, HttpServletResponse response) {
        log.debug("Here is the user : {}", user);
        Long userId = user.getId();
        try {
            userService.deleteUserById(userId);
            log.info("User deleted successfully (name: {}, id: {})", user.getUsername(), userId);

            if(request.getSession(false) != null) {
                request.getSession().invalidate();
            }

            Cookie cookie = new Cookie("JSESSIONID", null);
            cookie.setPath("/");
            cookie.setHttpOnly(true);
            cookie.setMaxAge(0);
            response.addCookie(cookie);

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
