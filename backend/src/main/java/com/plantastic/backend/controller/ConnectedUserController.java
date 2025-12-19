package com.plantastic.backend.controller;

import com.plantastic.backend.dto.auth.AuthUserDto;
import com.plantastic.backend.dto.auth.DigitalGardenResponseDto;
import com.plantastic.backend.dto.plants.UserPlantSummaryDto;
import com.plantastic.backend.repository.UserPlantRepository;
import com.plantastic.backend.security.user.CustomUserDetails;
import com.plantastic.backend.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/me")
@RequiredArgsConstructor
@Slf4j
public class ConnectedUserController {

    private final UserService userService;
    private final UserPlantRepository userPlantRepository;

    @DeleteMapping("/delete")
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

    @GetMapping("/my-digital-garden")
    public ResponseEntity<DigitalGardenResponseDto> getMyDigitalGarden(@AuthenticationPrincipal CustomUserDetails userDetails) {
        AuthUserDto authUserDto = new AuthUserDto(userDetails.getId(), userDetails.getEmail(), userDetails.getRole());
        List<UserPlantSummaryDto> digitalGarden = userPlantRepository.findDigitalGardenByUserId(userDetails.getId());

        if (digitalGarden.isEmpty()) {
            log.warn("User with id {} seems to have no plants", userDetails.getId());
            return ResponseEntity.ok(new DigitalGardenResponseDto(authUserDto, Collections.emptyList()));
        }
        return ResponseEntity.ok(new DigitalGardenResponseDto(authUserDto, digitalGarden));
    }

    @GetMapping("/")
    public ResponseEntity<AuthUserDto> getAuthInformations(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        AuthUserDto authUserDto = new AuthUserDto(userDetails.getId(), userDetails.getEmail(), userDetails.getRole());
        return ResponseEntity.ok(authUserDto);
    }
}
