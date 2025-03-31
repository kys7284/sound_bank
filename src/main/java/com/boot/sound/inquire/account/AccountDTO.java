package com.boot.sound.inquire.account;

import lombok.Data;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Data
@Entity
@Table(name = "ACCOUNT_TBL")
public class AccountDTO {

    @Id
    @Column(name = "ACCOUNT_NUMBER")
    private String account_number;           // 계좌번호

    @Column(name = "CUSTOMER_ID")
    private String customer_id;              // 고객 ID

    @Column(name = "ACCOUNT_TYPE")
    private String account_type;             // 계좌 타입

    @Column(name = "BALANCE")
    private int balance;                    // 잔액

    @Column(name = "INTEREST_RATE")
    private Double interest_rate;            // 이자율 (예적금용)

    @Column(name = "YIELD_RATE")
    private Double yield_rate;               // 수익률 (펀드용)

    @Column(name = "CURRENCY_TYPE")
    private String currency_type;            // 통화 (KRW, USD 등)

    @Column(name = "ACCOUNT_NAME")
    private String account_name;             // 계좌 이름

    @Column(name = "OPEN_DATE")
    private Date open_date;                  // 개설일

    @Transient
    private String account_number_column;    // 타입별 실제 컬럼명 (DB 저장 안 됨)
}