package com.telran.phonebookapi.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/phone")
public class PhoneController {

    @GetMapping("/get")
    public String getString() {
        return "Phone get ok!";
    }
}
