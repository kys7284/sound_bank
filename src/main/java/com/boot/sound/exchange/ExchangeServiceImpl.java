package com.boot.sound.exchange;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.apache.http.impl.client.HttpClients;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.boot.sound.customer.CustomerDTO;
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
    
    // 계좌 조회
    @Transactional(readOnly = true)
    public AccountDTO findbyId(String customer_id) {
    	System.out.println("service - findbyId");
    	
    	return dao.findbyId(customer_id);
    }
    
    // 계좌 비밀번호 검증
    @Transactional(readOnly = true)
    public int accountPwdChk(Map<String, Object> map) {
        System.out.println("service - accountPwdChk");
    	return dao.pwdChk(map);
    }
    
    // 지갑 생성 요청
    @Transactional
    public int requestAccount(ExchangeAccountRequestDTO dto) {
    	
    	return dao.accountRequest(dto);
    }

}
