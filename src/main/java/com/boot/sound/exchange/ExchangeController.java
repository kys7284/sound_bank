package com.boot.sound.exchange;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.boot.sound.inquire.account.AccountDTO;


@RestController
@RequestMapping("/api/exchange")
@CrossOrigin // React 프론트엔드 주소
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
    
    // 고객 계좌 조회
    @GetMapping("/account/{customer_id}")
    public List<Map<String, Object>> getAccountsByCustomerId(@PathVariable String customer_id) {
        AccountDTO dto = service.findbyId(customer_id);
        System.out.println(dto);
        Map<String, Object> result = new HashMap<>();
        result.put("customer_id", dto.getCustomer_id());
        result.put("account_number", dto.getAccount_number());
        result.put("balance", dto.getBalance());

        return Collections.singletonList(result); // 리스트로 감싸기!
    }
    
    // 계좌 비밀번호 확인
    @PostMapping("/account/pwdChk")
    public ResponseEntity<String> accountPwdChk(@RequestBody Map<String, Object> map) {
        
    	System.out.println(map);
        
    	int result = service.accountPwdChk(map);
    	System.out.println("result = " + result);

    	if (result == 1) {
            return ResponseEntity.ok("비밀번호 확인 성공");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호가 일치하지 않습니다.");
        }
    }
    
    // 외환계좌 생성 요청
    @PostMapping("/account/request")
    public ResponseEntity<?> exAccountRequest(@RequestBody ExchangeAccountRequestDTO dto) {
        System.out.println("controller - 계좌생성 요청");
        System.out.println("서버에서 온 dto : "+ dto);
        // 서비스로 전달
        int result = service.requestAccount(dto);  // insert 결과 int로 받는다고 가정
        System.out.println("result = "+result);
        // 성공 여부에 따라 응답 반환
        if (result > 0) {
            return new ResponseEntity<>("요청이 정상적으로 등록되었습니다.", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("요청 등록 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }   
}
