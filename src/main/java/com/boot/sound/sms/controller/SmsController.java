package com.boot.sound.sms.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.boot.sound.sms.dto.SmsRequest;
import com.boot.sound.sms.service.SmsService;

@RestController
@RequestMapping("/api/sms")
public class SmsController {

    private final SmsService smsService;

    public SmsController(SmsService smsService) {
        this.smsService = smsService;
    }

    @PostMapping("/request")
    public ResponseEntity<?> sendSms(@RequestBody SmsRequest smsRequest) {
        String phoneNumber = smsRequest.getPhoneNumber();
        System.out.println("Requested phone number: " + phoneNumber);
        boolean result = smsService.sendVerificationSms(phoneNumber);
        if (result) {
            return ResponseEntity.ok("SMS sent successfully using CoolSMS SDK.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Failed to send SMS using CoolSMS SDK.");
        }
    }
}
