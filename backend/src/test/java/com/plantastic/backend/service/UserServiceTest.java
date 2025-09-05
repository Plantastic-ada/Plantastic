package com.plantastic.backend.service;

import com.plantastic.backend.models.entity.User;
import com.plantastic.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private UserService userService;

    /**
     *
     */
    @Test
    void testFindUserByUsernameOrEmailWithEmail() {
        //Arrange
        String email = "test@example.com";
        User expectedUser = new User();
        expectedUser.setEmail(email);
        Mockito.when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(expectedUser));

        //Act
        Optional<User> result = userService.findUserByUsernameOrEmail(email);

        //Assert
        assertTrue(result.isPresent());
        assertEquals(email, result.get().getEmail());
        Mockito.verify(userRepository).findByEmail(email);
        Mockito.verify(userRepository, Mockito.never()).findByUsername(Mockito.anyString());
    }

    @Test
    void testFindUserByUsernameOrEmailWithUsername() {
        //Arrange
        String username = "known user";
        User expectedUser = new User();
        expectedUser.setUsername(username);
        Mockito.when(userRepository.findByUsername(username))
                .thenReturn(Optional.of(expectedUser));

        //Act
        Optional<User> result = userService.findUserByUsernameOrEmail(username);

        //Assert
        assertTrue(result.isPresent());
        assertEquals(username, result.get().getUsername());
        Mockito.verify(userRepository).findByUsername(username);
        Mockito.verify(userRepository, Mockito.never()).findByEmail(Mockito.anyString());
    }

    @Test
    void testFindUserByUsernameOrEmailWithAWrongUser() {
        //Arrange
        String username = "unknown user";
        User expectedUser = new User();
        expectedUser.setUsername(username);
        Mockito.when(userRepository.findByUsername(username))
                .thenReturn(Optional.empty());

        //Act
        Optional<User> result = userService.findUserByUsernameOrEmail(username);

        //Assert
        assertTrue(result.isEmpty());
        Mockito.verify(userRepository).findByUsername(username);
        Mockito.verify(userRepository, Mockito.never()).findByEmail(Mockito.anyString());
    }
}