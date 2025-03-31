package com.boot.sound.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class CustomerController {

    @Autowired
    private CustomerService service;

    // 계좌개설
    @PostMapping("/joinAction.do")
    public ResponseEntity<?> registerCustomer(@RequestBody CustomerDTO customer) {
        try {
            // 고객이 제출한 아이디가 이미 사용 중인 아이디인지 확인
            if (service.checkId(customer.getCustomer_id())) {
                return ResponseEntity.badRequest().body("이미 사용중인 아이디입니다");
            }

            // 아이디가 중복되지 않으면 회원가입을 위한 서비스 메소드 호출
            service.registerCustomer(customer);
            
            // 계좌개설이 성공적으로 완료되었음을 알리는 메시지 반환
            return ResponseEntity.ok("계좌개설 완료되었습니다");
        } catch (Exception e) {
            // 예외 발생 시 400 Bad Request 응답 반환, 예외 메시지를 포함
            return ResponseEntity.badRequest().body("회원가입 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    // ID 중복 확인의 응답을 담기 위한 DTO 클래스
    private static class IdCheckResponse {
        private boolean available; // 아이디 사용 가능 여부
        private String message;    // 아이디 상태에 대한 메시지

        // 생성자: 아이디 사용 가능 여부와 메시지를 전달받아 초기화
        public IdCheckResponse(boolean available, String message) {
            this.available = available;
            this.message = message;
        }

        // getter 메소드들
        public boolean isAvailable() { return available; }
        public String getMessage() { return message; }
    }
    
    // ID 중복확인
    @GetMapping("/idConfirmAction.do")
    public ResponseEntity<?> checkId(@RequestParam String customer_id) {
        // 고객이 요청한 아이디(customer_id)가 이미 사용 중인지 확인하는 서비스 호출
        boolean isDuplicate = service.checkId(customer_id);
        
        // 아이디 사용 가능 여부를 기반으로 응답 메시지를 설정하여 반환
        return ResponseEntity.ok(new IdCheckResponse(!isDuplicate,
                isDuplicate ? "이미 사용중인 아이디입니다" : "사용 가능한 아이디입니다"));
    }

    // 로그인
    @PostMapping("/login.do")
    public ResponseEntity<?> login(@RequestBody CustomerDTO loginInfo) {
        CustomerDTO customer = service.login(loginInfo.getCustomer_id(), loginInfo.getCustomer_password());
        
        if (customer != null) {
            return ResponseEntity.ok("로그인 성공");
        } else {
            return ResponseEntity.status(401).body("아이디 또는 비밀번호가 틀렸습니다");
        }
    }
    
}