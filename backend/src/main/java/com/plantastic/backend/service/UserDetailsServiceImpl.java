package com.plantastic.backend.service;


import com.plantastic.backend.models.entity.User;
import com.plantastic.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException{
        Optional<User> userOpt = userService.findUserByUsernameOrEmail(usernameOrEmail);

        User user = userOpt.orElseThrow(() ->
                new UsernameNotFoundException("User not found with these credentials : " + usernameOrEmail));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                new ArrayList<>()
        );
    }
}
