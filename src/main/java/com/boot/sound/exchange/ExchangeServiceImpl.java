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

    //환율 리스트
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

            String response = restTemplate.getForObject(url, String.class);
            return objectMapper.readValue(response, new TypeReference<List<Map<String, Object>>>() {});
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("환율 정보 조회 중 오류 발생", e);
        }
    }
    
    @Transactional
    public ExchangeRequestDTO requestExchange(ExchangeRequestDTO dto) {
        dao.requestExchange(dto); // dto에 exchange_request_id 채워짐
        return dao.selectExchangeRequestById(dto.getExchange_request_id());
    }
}
