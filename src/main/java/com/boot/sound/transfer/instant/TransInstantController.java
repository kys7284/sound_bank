package com.boot.sound.transfer.instant;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transInstant")
public class TransInstantController {

    private final TransInstantService service;

    // 생성자 주입
    public TransInstantController(TransInstantService service) {
        this.service = service;
    }

    // 실시간 이체 저장 요청 받기 (POST 방식)
    @PostMapping("/send")
    public String send(@RequestBody TransInstantDTO dto) {
        // 서비스에서 결과 메시지("이체 완료", "비밀번호 오류", "이체 실패")를 그대로 반환
        return service.send(dto);
    }
}
