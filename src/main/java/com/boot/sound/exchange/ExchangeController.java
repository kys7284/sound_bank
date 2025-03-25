package com.boot.sound.exchange;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exchange")
@CrossOrigin(origins = "http://localhost:3000")
public class ExchangeController {

    @Autowired
    private ExchangeServiceImpl service;

    // 환율 조회 API (날짜 선택 가능, 기본값: 오늘 날짜)
    @GetMapping("/rates")
    public List<Map<String, Object>> getExchangeRates(@RequestParam(required = false) String date) {
        System.out.println("API 요청: 환율 조회");

        // 날짜가 제공되지 않으면 오늘 날짜를 yyyyMMdd 형식으로 설정
        if (date == null || date.isEmpty()) {
            date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        }

        return service.getExchangeRates(date);
    }
}
