package com.plantastic.backend.controller;

import com.plantastic.backend.models.entity.User;
import com.plantastic.backend.models.types.NotificationsPreferences;
import com.plantastic.backend.models.types.UserRole;
import com.plantastic.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setup() {
        userRepository.deleteAll();
        userRepository.flush();

        // Crée un utilisateur test avec password encodé
        User user = new User();
        user.setUsername("toto");
        user.setEmail("toto@example.com");
        user.setPassword(passwordEncoder.encode("secret"));
        user.setRole(UserRole.USER);
        user.setNotificationsPreferences(NotificationsPreferences.STANDARD);
        userRepository.save(user);
    }

    @Test
    void testLoginWithUsername() throws Exception {
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("username", "toto")
                        .param("password", "secret"))
                .andExpect(status().isOk());
//                .andExpect(cookie().exists("JSESSIONID"));
    }

    @Test
    void testLoginWithEmail() throws Exception {
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("username", "toto@example.com")  // ici on passe l'email dans le champ username
                        .param("password", "secret"))
                .andExpect(status().isOk());
//                .andExpect(cookie().exists("JSESSIONID"));
    }

    @Test
    void testLoginFail() throws Exception {
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("username", "toto")
                        .param("password", "wrongpassword"))
                .andExpect(status().isUnauthorized());
    }
}