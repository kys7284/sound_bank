package com.boot.sound.exchange;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.boot.sound.customer.CustomerDTO;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exchange")
@CrossOrigin(origins = "http://localhost:3000") // React 프론트엔드 주소
public class ExchangeController {

    @Autowired
    private ExchangeServiceImpl service;

    // 날짜별 환율 조회 API
    @GetMapping("/rates")
    public ResponseEntity<List<Map<String, Object>>> getExchangeRates(@RequestParam(required = false) String date) {

        System.out.println("<<<< Controller API 요청 환율 조회 >>>>>>");

        if (date == null || date.isEmpty()) {
            date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        }

        System.out.println("paramDate : " + date);

        List<Map<String, Object>> rates = service.getExchangeRates(date);
        System.out.println("List = " + rates);

        return ResponseEntity.ok(rates); // 상태 코드 200과 함께 반환
    }
    
    // 환전 신청
//    @PostMapping("/requestEx")
//    public ResponseEntity<ExchangeRequestDTO> requestExchange(@RequestBody ExchangeRequestDTO dto){
//        ExchangeRequestDTO result = service.requestExchange(dto);
//        
//        return ResponseEntity.status(HttpStatus.CREATED).body(result);
//    }
    
    // 고객 계좌 조회
    @GetMapping("/account/{customer_id}")
    public List<Map<String, Object>> getAccountsByCustomerId(@PathVariable String customer_id) {
        CustomerDTO dto = service.findbyId(customer_id);
        System.out.println(dto);
        Map<String, Object> result = new HashMap<>();
        result.put("customer_id", dto.getCustomer_id());
        result.put("account_number", dto.getCustomer_account_number());

        return Collections.singletonList(result); // 리스트로 감싸기!
    }

    
}
