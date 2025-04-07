package com.boot.sound.jwt.exception;

import org.springframework.security.core.AuthenticationException;

public class CustomTokenExpiredException extends AuthenticationException {

    public CustomTokenExpiredException(String msg) {
        super(msg);
    }
}
