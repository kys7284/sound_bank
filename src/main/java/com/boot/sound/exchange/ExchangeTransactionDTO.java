package com.boot.sound.exchange;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name="exchange_transaction")
public class ExchangeTransactionDTO {
	
	@JsonProperty("exchange_transaction_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
    private Long exchange_transaction_id;	// 거래 ID(PK)

	@JsonProperty("exchange_rate_id")
    private Long exchangeRate_id;             // 환율 정보 (FK)
	
    @JsonProperty("customer_id")
    private String customer_id;				// 사용자 ID (FK)

    @JsonProperty("withdraw_account_number")
    private String withdraw_account_number;	// 계좌번호(FK)

    @JsonProperty("to_currency")
    private String to_currency;

    @JsonProperty("request_amount")
    private BigDecimal request_amount;

    @JsonProperty("exchanged_amount")
    private BigDecimal exchanged_amount;

    @JsonProperty("exchange_rate")
    private BigDecimal exchange_rate;

    @JsonProperty("exchange_transaction_date")
    private LocalDateTime exchange_transaction_date;
    
    

}
//-- 지갑 충전(환전)
//drop table exchange_transaction;
//CREATE TABLE exchange_transaction (
//  EXCHANGE_TRANSACTION_ID BIGINT AUTO_INCREMENT PRIMARY KEY,           -- 거래 ID
//  CUSTOMER_ID VARCHAR(20) NOT NULL,                  -- 고객 ID
//  WITHDRAW_ACCOUNT_NUMBER VARCHAR(20) NOT NULL,      -- 출금 계좌번호
//  TO_CURRENCY VARCHAR(10) NOT NULL,                  -- 변환할 통화 ex)USD
//  REQUEST_AMOUNT DECIMAL(18,2) NOT NULL,             -- 충전 금액(원)
//  EXCHANGED_AMOUNT DECIMAL(18,2) NOT NULL,           -- 환전된 외화 금액
//  EXCHANGE_RATE DECIMAL(10,4) NOT NULL,              -- 적용 환율 
//  EXCHANGE_TRANSACTION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,       -- 거래 일시
//
//  -- FK 연결
//  CONSTRAINT fk_tx_customer FOREIGN KEY (CUSTOMER_ID)
//    REFERENCES customer_tbl(customer_id) ON DELETE CASCADE,
//
//  CONSTRAINT fk_tx_account FOREIGN KEY (WITHDRAW_ACCOUNT_NUMBER)
//    REFERENCES account_tbl(account_number) ON DELETE CASCADE
//);
