package com.plantastic.backend.security.handler;

import com.plantastic.backend.event.UserLoginSuccessEvent;
import com.plantastic.backend.security.user.CustomUserDetails;
import com.plantastic.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class CustomLoginSuccessHandler implements AuthenticationSuccessHandler {

    private final ApplicationEventPublisher eventPublisher;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        Long userId = null;

        if (authentication.getPrincipal() instanceof CustomUserDetails userDetails
                && authentication.getPrincipal() != null) {
            userId = userDetails.getId();
        }

        log.info("User '{}' / '{}' has successfully logged in.", userId, authentication.getName());

        // Update last connection
        eventPublisher.publishEvent(new UserLoginSuccessEvent(authentication.getName(), userId));

        //Prepare JSON response
        request.getSession();
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String jsonResponse = String.format(
                "{\"status\":\"success\"," +
                        "\"mail\":\"%s\"," +
                        "\"id\":\"%s\"}"
                , authentication.getName(), userId
        );
        response.getWriter().write(jsonResponse);

    }
}