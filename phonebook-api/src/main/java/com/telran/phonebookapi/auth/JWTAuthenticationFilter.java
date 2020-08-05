package com.telran.phonebookapi.auth;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.telran.phonebookapi.dto.UserRegisterDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

public class JWTAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
    private final AuthenticationManager authenticationManager;
    private final ObjectMapper objectMapper;

    public JWTAuthenticationFilter(
            AuthenticationManager authenticationManager,
            ObjectMapper objectMapper) {
        super(new AntPathRequestMatcher(FilterConstants.LOGIN, "POST"));
        this.authenticationManager = authenticationManager;
        this.objectMapper = objectMapper;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res)
            throws AuthenticationException {
        try {
            UserRegisterDto userDto = objectMapper.readValue(req.getInputStream(), UserRegisterDto.class);

            Authentication auth = new UsernamePasswordAuthenticationToken(
                    userDto.email,
                    userDto.password
            );

            return authenticationManager.authenticate(auth);
        } catch (IOException ignored) {
        }
        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) {

        String token = JWT.create()
                .withSubject(((User) auth.getPrincipal()).getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + FilterConstants.EXPIRATION_TIME))
                .sign(HMAC512(FilterConstants.SECRET.getBytes()));

        res.addHeader(FilterConstants.HEAD, FilterConstants.VALUE + token);
    }
}
