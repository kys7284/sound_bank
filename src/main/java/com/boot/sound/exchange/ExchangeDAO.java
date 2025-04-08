package com.boot.sound.exchange;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.boot.sound.inquire.account.AccountDTO;

@Mapper
@Repository
public interface ExchangeDAO {

    // 고객 계좌 조회 (계좌번호 기준)
    public AccountDTO findAccountByNumber(@Param("account_number") String account_number);

    // 계좌 잔액 업데이트
    public int updateAccountBalance(AccountDTO dto);

    // 지갑 존재 여부 확인 (있으면 1, 없으면 0)
    public int findByCustomerAndCurrency(@Param("customer_id") String customer_id,
                                  @Param("currency_code") String currency_code);

    // 고객 계좌 조회    
    public AccountDTO findAccountById(String customer_id);

    // 지갑 생성
    public int insertWallet(ExchangeWalletDTO dto);

    // 지갑 잔액 업데이트
    public int updateWalletBalance(ExchangeWalletDTO dto);

    // 환전 내역 저장
    public int chargeWallet(ExchangeTransactionDTO dto);

    // 환전한 거래 내역 조회
    public ExchangeTransactionDTO findTransById(@Param("customer_id") String customer_id);
    
    // 기존 지갑 잔액조회
    public ExchangeWalletDTO findWalletByCustomerAndCurrency(@Param("customer_id") String customer_id,
            @Param("currency_code") String currency_code);
    
    // 환율 DB에 저장
    public int insertExchangeRate(Map<String, Object> rate);
}

