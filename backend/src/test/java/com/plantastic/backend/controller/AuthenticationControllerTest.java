package com.plantastic.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.plantastic.backend.dto.auth.RegisterRequest;
import com.plantastic.backend.models.entity.User;
import com.plantastic.backend.models.types.NotificationsPreferences;
import com.plantastic.backend.models.types.UserRole;
import com.plantastic.backend.repository.UserRepository;
import com.plantastic.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthenticationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private RegisterRequest registerRequest;

    private static final String LOGIN_ROUTE = "/api/auth/login";
    private static final String REGISTER_ROUTE = "/api/auth/register";

    @BeforeEach
    void setup() {
        userRepository.deleteAll();
        userRepository.flush();

        // Create a new user with a encoded password in the db
        User user = new User();
        user.setUsername("existingUser");
        user.setEmail("existingUser@example.com");
        user.setPassword(passwordEncoder.encode("secret"));
        user.setRole(UserRole.USER);
        user.setNotificationsPreferences(NotificationsPreferences.STANDARD);
        userRepository.save(user);

        // Create a register request to allow us to test /register route
        registerRequest = new RegisterRequest();
        registerRequest.setPassword("newSecret");
    }

    @Test
    void testLoginWithUsername() throws Exception {
        mockMvc.perform(post(LOGIN_ROUTE)
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("username", "existingUser")
                        .param("password", "secret"))
                .andExpect(status().isOk());
//                .andExpect(cookie().exists("JSESSIONID"));
    }

    @Test
    void testLoginWithEmail() throws Exception {
        mockMvc.perform(post(LOGIN_ROUTE)
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .param("username", "existingUser@example.com")  //Email in username field
                    .param("password", "secret"))
                .andExpect(status().isOk());
//                .andExpect(cookie().exists("JSESSIONID"));
    }

    @Test
    void testLoginFail() throws Exception {
        mockMvc.perform(post(LOGIN_ROUTE)
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .param("username", "existingUser")
                    .param("password", "wrongpassword"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void testRegisterSuccess() throws Exception {
        registerRequest.setUsername("newUser");
        registerRequest.setEmail("newUser@example.com");

        mockMvc.perform(post(REGISTER_ROUTE)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(new ObjectMapper().writeValueAsString(registerRequest)))
                .andExpect(status().isCreated())
                .andExpect(content().string("User registered successfully: newUser"));

        assertTrue(userService.emailExists("newUser@example.com"));
    }

    @Test
    void testRegisterFailureWithExistingMail() throws Exception {
        registerRequest.setUsername("newUser");
        registerRequest.setEmail("existingUser@example.com");

        mockMvc.perform(post(REGISTER_ROUTE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(registerRequest)))
                .andExpect(status().isConflict())
                .andExpect(content().string("Email already used: existingUser@example.com"));

        assertFalse(userService.usernameExists("newUser"));
        assertTrue(userService.emailExists("existingUser@example.com"));
    }

    @Test
    void testRegisterFailureWithExistingUsername() throws Exception {
        registerRequest.setUsername("existingUser");
        registerRequest.setEmail("newUser@example.com");

        mockMvc.perform(post(REGISTER_ROUTE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(registerRequest)))
                .andExpect(status().isConflict())
                .andExpect(content().string("Username already used: existingUser"));

        assertFalse(userService.emailExists("newUser@example.com"));
        assertTrue(userService.usernameExists("existingUser"));
    }
}