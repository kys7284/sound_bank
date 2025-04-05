package com.boot.sound.exchange;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.apache.http.impl.client.HttpClients;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.boot.sound.inquire.account.AccountDTO;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ExchangeServiceImpl {

    private final String apiKey = "TzsQ31CAai0yWB3qXIhrtFyxqpxNO7H6";
    
    // 리디렉션 처리 가능한 HttpClient 설정
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

   
    private final ExchangeDAO dao;
    
    public ExchangeServiceImpl(ExchangeDAO dao) {
    	
    	this.dao = dao;
    	
    	HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
    	factory.setHttpClient(HttpClients.custom().disableRedirectHandling().build());
        this.restTemplate = new RestTemplate(factory);		
    }

 // 환율 리스트
    public List<Map<String, Object>> getExchangeRates(String date) {
        try {
            if (date == null || date.isEmpty()) {
                date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            } else if (date.contains("-")) {
                date = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"))
                        .format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            }

            String url = "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON"
                    + "?authkey=" + apiKey
                    + "&searchdate=" + date
                    + "&data=AP01";

            System.out.println("요청 URL: " + url);

            // 재시도 로직 적용
            String response = fetchWithRetry(url, 3, 1000);
            return objectMapper.readValue(response, new TypeReference<List<Map<String, Object>>>() {});
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("환율 정보 조회 중 오류 발생", e);
        }
    }
    
    // 재요청 메서드
    private String fetchWithRetry(String url, int maxRetries, long delayMs) {
        for (int attempt = 1; attempt <= maxRetries; attempt++) { // 
            try {
                String response = restTemplate.getForObject(url, String.class);
                if (response != null && !response.isEmpty()) {
                    return response;
                }
                System.err.println("응답이 비어있음. 재시도 중... (" + attempt + "/" + maxRetries + ")");
                Thread.sleep(delayMs);
            } catch (Exception e) {
                System.err.println("예외 발생. 재시도 중... (" + attempt + "/" + maxRetries + ")");
                e.printStackTrace();
                try {
                    Thread.sleep(delayMs);
                } catch (InterruptedException ignored) {}
            }
        }
        throw new RuntimeException("환율 정보 요청 재시도 실패");
    }    
    
    // 고객 계좌 조회
    @Transactional(readOnly = true)
    public AccountDTO findById(String customer_id){

        System.out.println("service - findById");

        return dao.findAccountById(customer_id);
    }

    // 지갑 충전/지갑이 존재하지않을시 자동으로 지갑 생성. 
    @Transactional
    public ExchangeTransactionDTO chargeWallet(ExchangeTransactionDTO dto) {
        
        String customer_id = dto.getCustomer_id();               // 고객 ID
        String currency_code = dto.getTo_currency();             // 외화 통화
        BigDecimal request_amount = dto.getRequest_amount();     // 환전 금액
        BigDecimal exchanged_amount = dto.getExchanged_amount(); // 환전된 외화 금액

        // 1. 출금 계좌 확인
        AccountDTO account = dao.findAccountByNumber(dto.getWithdraw_account_number());
        if (account == null) {
            throw new RuntimeException("출금 계좌를 찾을 수 없습니다.");
        }

        // 2. 계좌 잔액 확인 및 차감
        if (account.getBalance().compareTo(request_amount) <= 0) { // account의 잔액이 0보다 작거나 같을때
            throw new RuntimeException("계좌 잔액이 부족합니다."); // 예외처리
        }
        account.setBalance(account.getBalance().subtract(request_amount)); // 계좌에 있는 금액에서 환전신청 금액을 뺀다.
        dao.updateAccountBalance(account); 

        // 3. 지갑 존재 여부 확인
        int exists = dao.findByCustomerAndCurrency(customer_id, currency_code); // 지갑 테이블에서 

        if (exists == 0) {
            // 지갑이 없으면 생성 + 환전 금액만큼 초기 잔액 설정
            ExchangeWalletDTO wallet = new ExchangeWalletDTO();
            wallet.setCustomer_id(customer_id);
            wallet.setCurrency_code(currency_code);
            wallet.setBalance(exchanged_amount);
            wallet.setStatus("ACTIVE");
            dao.insertWallet(wallet);
        } else {
            // 지갑이 있으면 기존 잔액 조회 후 더해서 업데이트
            ExchangeWalletDTO wallet = dao.findWalletByCustomerAndCurrency(customer_id, currency_code);
            if (wallet == null) {
                throw new RuntimeException("지갑 조회 실패");
            }

            BigDecimal newBalance = wallet.getBalance().add(exchanged_amount);
            wallet.setBalance(newBalance);
            dao.updateWalletBalance(wallet);
        }


        // 환전 거래 내역 저장
        int result = dao.chargeWallet(dto);
        if (result <= 0) {
            throw new RuntimeException("환전 거래 등록 실패");
        }

        // 방금 등록한 거래 내역 반환
        return dao.findTransById(customer_id);
    }
    
}
