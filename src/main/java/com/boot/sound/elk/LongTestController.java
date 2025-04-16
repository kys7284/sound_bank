package com.boot.sound.elk;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@RestController
@RequestMapping("/elk")
public class LongTestController {

    @GetMapping("/log-test")
    public String testLog() {
        log.info("환율 저장 시도: USD 1350.25");
        log.error("환율 저장 실패: API Timeout 발생");
        return "로그발생완료";
    }
    

}
