package com.plantastic.backend.security.user;


import com.plantastic.backend.models.entity.User;
import com.plantastic.backend.repository.UserRepository;
import com.plantastic.backend.util.UserUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailsImplService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public CustomUserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException{
        Optional<User> userOpt = UserUtil.findByUsernameOrEmail(userRepository, usernameOrEmail);

        User user = userOpt.orElseThrow(() ->
                new UsernameNotFoundException("User not found with these credentials : " + usernameOrEmail));

        return new CustomUserDetails(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getRole()
        );
    }
}
