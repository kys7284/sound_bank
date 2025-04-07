package com.boot.sound.customer;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "CUSTOMER_TBL")
public class CustomerDTO {

    @Id
    @Column(name = "CUSTOMER_ID", nullable = false, length = 20)
    private String customer_id;
    
    @Column(name = "CUSTOMER_NAME", nullable = false, length = 20)
    private String customer_name;

    @Column(name = "CUSTOMER_PASSWORD", nullable = false, length = 100)
    private String customer_password;

    @Column(name = "CUSTOMER_RESIDENT_NUMBER", nullable = false, length = 20)
    private String customer_resident_number;
    
	@Column(name = "CUSTOMER_ADDRESS", nullable = false, columnDefinition = "CLOB")
    private String customer_address;

    @Column(name = "CUSTOMER_PHONE_NUMBER")
    private String customer_phone_number;

    @Column(name = "CUSTOMER_EMAIL", length = 20)
    private String customer_email;

    @Column(name = "CUSTOMER_JOB", length = 10)
    private String customer_job;

    // 대표계좌
    @Column(name = "CUSTOMER_ACCOUNT_NUMBER", nullable = false)
    private String customer_account_number;

    @Column(name = "CUSTOMER_BIRTHDAY", length = 20)
    private String customer_birthday;

    @Column(name = "CUSTOMER_RISK_TYPE")
    private String customer_risk_type;
    
    // Auth_token 로그인시 유효시간 만료시 사라지는 실제 인증 토큰
    private String customer_token;
    // Refresh_Token Auth_token 유효시간 만료시 토큰재발급에 필요한 인증 토큰
    @Column(name = "REFRESH_TOKEN")
    private String refresh_token;
    
}