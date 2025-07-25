package com.plantastic.backend.service;

import com.plantastic.backend.models.entity.User;
import com.plantastic.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /**
     * When a user logs in, we update the last_log_in field in db
     *
     * @param usernameOrEmail
     */
    public void updateLastLogin(String usernameOrEmail) {

        Optional<User> userOpt;
        userOpt = findUserByUsernameOrEmail(usernameOrEmail);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setLastLoginAt(LocalDateTime.now());
            userRepository.save(user);
        }
    }

    public Optional<User> findUserByUsernameOrEmail(String usernameOrEmail) {
        boolean isEmail = usernameOrEmail.contains("@");

        return isEmail
                ? userRepository.findByEmail(usernameOrEmail)
                : userRepository.findByUsername(usernameOrEmail);
    }

}
