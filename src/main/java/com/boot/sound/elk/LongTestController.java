package com.boot.sound.elk;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@RestController
@RequestMapping("/elk")
public class LongTestController {

    @GetMapping("/log-test")
    public String testLog(@RequestParam String user_id, @RequestParam String action) {
        log.info("log-test | user_id={} | action={}",user_id, action);
        return "logggggggg";
    }
    

}
