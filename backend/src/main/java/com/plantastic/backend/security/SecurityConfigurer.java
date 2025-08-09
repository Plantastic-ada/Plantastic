package com.plantastic.backend.security;

import com.plantastic.backend.service.UserDetailsImplService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class SecurityConfigurer {

    private final UserDetailsImplService userDetailsImplService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, Environment env) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/", "/auth/login", "/auth/register").permitAll()
                    .anyRequest().authenticated()
                );

        //Login with cookie session
        http.formLogin(form -> form
                .loginProcessingUrl("/auth/login")
                .successHandler((request, response, authentication) -> {
                    request.getSession();
                    response.setStatus(200);
                    response.flushBuffer();
                })
                .failureHandler((request, response, exception) -> response.setStatus(401))
        );
        //Logout with cookie session : delete cookie on logout
        http.logout(logout -> logout
                .logoutUrl("/auth/logout")
                .deleteCookies("JSESSIONID")
                .logoutSuccessHandler((request, response, authentication) -> response.setStatus(200))
        );
        http.sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
        );

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
