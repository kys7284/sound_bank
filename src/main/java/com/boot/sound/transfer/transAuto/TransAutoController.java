package com.boot.sound.transfer.transAuto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transAuto")
public class TransAutoController {

    @Autowired
    private TransAutoService service;

    // 자동이체 등록 요청
    @PostMapping("/add")
    public String add(@RequestBody TransAutoDTO dto) {
        // 비밀번호 확인
        boolean ok = service.checkPassword(dto.getOut_account_number(), dto.getPassword());

        if (!ok) {
            return "비밀번호 오류";
        }

        // 누락될 수 있는 기본값 보완
        dto.setTransfer_type("자동");   // 이체 유형 고정
        dto.setActive_yn("Y");          // 기본 사용 상태

        service.saveTransAuto(dto);
        
        return "자동이체 등록완료";
    }
}
