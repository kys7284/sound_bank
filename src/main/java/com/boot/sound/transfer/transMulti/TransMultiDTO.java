package com.boot.sound.transfer.transMulti;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
public class TransMultiDTO {

    private String customer_id;                // 고객 번호
    private String out_account_number;      // 출금 계좌번호
    private String password;                // 출금 계좌 비밀번호
    private String memo;                    // 출금 메모

    @JsonProperty("transfers") // 프론트 JSON 키와 매핑
    private List<InList> inList;            // 입금 정보 목록

    @Data
    public static class InList {
        private String in_account_number;   // 입금 계좌번호
        private BigDecimal amount;          // 이체 금액
        private String in_name;             // 수취인 이름
        private String memo;                // 입금 메모
    }
}
