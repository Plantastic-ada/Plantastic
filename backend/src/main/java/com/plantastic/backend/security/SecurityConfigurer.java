package com.plantastic.backend.security;

import com.plantastic.backend.service.UserDetailsImplService;
import com.plantastic.backend.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
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
    private final ApplicationEventPublisher eventPublisher;

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
                //Login succes handler : sends a 200 http code and a json
                .successHandler((request, response, authentication) -> {
                    eventPublisher.publishEvent(new UserLoginSuccessEvent(authentication.getName()));
                    request.getSession();
                    response.setStatus(HttpServletResponse.SC_OK);
                    response.setContentType("application/json");
                    response.setCharacterEncoding("UTF-8");

                    String jsonResponse = String.format(
                            "{\"status\":\"success\",\"username\":\"%s\"}", authentication.getName()
                    );
                    response.getWriter().write(jsonResponse);
                })
                //Login failure handler : sends a 401 http code and a json
                .failureHandler((request, response, exception) -> {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.setContentType("application/json");
                    response.setCharacterEncoding("UTF-8");

                    String jsonResponse = String.format(
                            "{\"status\":\"error\",\"message\":\"%s\"}", exception.getMessage()
                    );
                    response.getWriter().write(jsonResponse);
                })
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
