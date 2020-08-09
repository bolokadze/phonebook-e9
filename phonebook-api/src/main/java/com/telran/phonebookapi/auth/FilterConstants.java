package com.telran.phonebookapi.auth;

public class FilterConstants {
    static final long EXPIRATION_TIME = 864_000_000;
    static final String SECRET = "secret";
    static final String HEAD = "Authorization";
    static final String VALUE = "Bearer ";
    static final String LOGIN = "/api/user/login";

}
