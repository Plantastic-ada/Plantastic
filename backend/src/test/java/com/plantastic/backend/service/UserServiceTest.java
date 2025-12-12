package com.plantastic.backend.service;

import com.plantastic.backend.dto.auth.RegisterRequest;
import com.plantastic.backend.event.UserLoginSuccessEvent;
import com.plantastic.backend.models.entity.User;
import com.plantastic.backend.models.types.NotificationsPreferences;
import com.plantastic.backend.models.types.UserRole;
import com.plantastic.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureTestDatabase
@ActiveProfiles("test")
class UserServiceTest {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ApplicationEventPublisher eventPublisher;

    private static final String EXISTING_USERNAME = "existingUser";
    private static final String EMAIL_SUFFIX = "@example.com";
    private static final String EXISTING_EMAIL = EXISTING_USERNAME + EMAIL_SUFFIX;
    private static final String PASSWORD = "passwordTest";
    private static final LocalDateTime ACTUAL_DATE_TIME = LocalDateTime.now();
    private static final LocalDate ACTUAL_DATE = LocalDate.now();

    private User existingUser;

    @BeforeEach
    void init() {
        userRepository.deleteAll();

        existingUser = new User();
        existingUser.setEmail(EXISTING_EMAIL);
        existingUser.setUsername(EXISTING_USERNAME);
        existingUser.setPassword(passwordEncoder.encode(PASSWORD));
        existingUser.setCreatedAt(LocalDateTime.of(2025, Month.JANUARY, 1, 0, 0));
        existingUser.setUpdatedAt(LocalDateTime.of(2025, Month.JANUARY, 1, 0, 0));
        existingUser.setRole(UserRole.USER);
        existingUser.setNotificationsConsent(false);
        existingUser.setNotificationsPreferences(NotificationsPreferences.STANDARD);
        existingUser.setCameraConsent(false);
        userRepository.save(existingUser);
    }

    /**
     * Must return an existant User using their email
     */
    @Test
    void testFindUserByUsernameOrEmailWithEmail() {
        //Act
        Optional<User> result = userService.findUserByUsernameOrEmail(EXISTING_EMAIL);

        //Assert
        assertTrue(result.isPresent());
        assertEquals(EXISTING_EMAIL, result.get().getEmail());
    }

    /**
     * Must return an existant User using their username
     */
    @Test
    void testFindUserByUsernameOrEmailWithUsername() {
        //Act
        Optional<User> result = userService.findUserByUsernameOrEmail(EXISTING_USERNAME);

        //Assert
        assertTrue(result.isPresent());
        assertEquals(EXISTING_USERNAME, result.get().getUsername());
    }

    /**
     * Must not return an existant User
     */
    @Test
    void testFindUserByUsernameOrEmailWithAWrongUser() {
        //Arrange
        String wrongUsername = "unknown user";

        //Act
        Optional<User> result = userService.findUserByUsernameOrEmail(wrongUsername);

        //Assert
        assertTrue(result.isEmpty());
    }

    @Test
    void testUpdateLastLogin() {
        //Act
        userService.updateLastLogin(EXISTING_EMAIL);

        //Assert
        User updatedUser = userRepository.findByEmail(EXISTING_EMAIL).orElseThrow();
        assertNotNull(updatedUser);
        assertEquals(ACTUAL_DATE, updatedUser.getLastLoginAt());
    }

    @Test
    void testHandleSuccessLoginEvent() {
        //Act
        eventPublisher.publishEvent(new UserLoginSuccessEvent(EXISTING_USERNAME, existingUser.getId()));

        //Assert
        User updatedUser = userRepository.findByEmail(EXISTING_EMAIL).orElseThrow();
        assertNotNull(updatedUser);
        assertEquals(ACTUAL_DATE, updatedUser.getLastLoginAt());
    }

    @Test
    void testCreateUser() {
        //Arrange
        String username = "newUser";
        String email = username + EMAIL_SUFFIX;
        RegisterRequest regReq = new RegisterRequest(email, username, PASSWORD);

        //Act
        userService.createUser(regReq);
        User newUser = userRepository.findByUsername(username).orElseThrow();

        //Assert
        assertNotNull(newUser);
        assertEquals(email, newUser.getEmail());
        assertEquals(username, newUser.getUsername());
        assertTrue(passwordEncoder.matches(PASSWORD, newUser.getPassword()));
        assertTrue(newUser.getCreatedAt().isAfter(ACTUAL_DATE_TIME));
        assertTrue(newUser.getUpdatedAt().isAfter(ACTUAL_DATE_TIME));
        assertEquals(UserRole.USER, newUser.getRole());
        assertFalse(newUser.isNotificationsConsent());
        assertNull(newUser.getNotificationsPreferences());
        assertFalse(newUser.isCameraConsent());
    }

    @Test
    void testDeleteUserById() {
        //Act
        User userToDelete = userRepository.findByEmail(EXISTING_EMAIL).orElseThrow();
        userService.deleteUserById(userToDelete.getId());

        //Assert
        Optional<User> deletedUser = userRepository.findByEmail(EXISTING_EMAIL);
        assertTrue(deletedUser.isEmpty());
    }



}