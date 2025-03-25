package com.boot.sound.exchange;

import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import io.netty.channel.ChannelOption;
import io.netty.handler.ssl.SslContextBuilder;
import io.netty.handler.ssl.util.InsecureTrustManagerFactory;
import reactor.netty.http.client.HttpClient;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;

@Service
public class ExchangeServiceImpl {

    // API Key
    private final String apiKey = "TzsQ31CAai0yWB3qXIhrtFyxqpxNO7H6";
    private final WebClient webClient;

    // WebClient 주입
    public ExchangeServiceImpl(WebClient.Builder webClientBuilder) {
//        HttpClient httpClient = HttpClient.create()
//                .responseTimeout(Duration.ofSeconds(10));
//
//        this.webClient = webClientBuilder
//                .clientConnector(new ReactorClientHttpConnector(httpClient))
//                .baseUrl("https://www.koreaexim.go.kr")
//                .build();
    	 // HttpClient 설정
        HttpClient httpClient = HttpClient.create()
                .secure(sslContextSpec -> sslContextSpec.sslContext(
                        SslContextBuilder.forClient().trustManager(InsecureTrustManagerFactory.INSTANCE))) // SSL 검증 비활성화
                .responseTimeout(Duration.ofSeconds(30)) // 응답 타임아웃 30초
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 10000); // 연결 타임아웃 10초

        // WebClient 설정
        this.webClient = webClientBuilder
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .baseUrl("https://www.koreaexim.go.kr")
                .build();

    }

    // 환율 조회 (현재 날짜를 yyyyMMdd 형식으로 변환하여 API 요청)
    public List<Map<String, Object>> getExchangeRates(String date) {
    	 // 날짜가 null이거나 비어 있으면 오늘 날짜로 설정
        if (date == null || date.isEmpty()) {
            date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        } else if (date.contains("-")) {
            // yyyy-MM-dd 형식인 경우 yyyyMMdd로 변환
            date = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"))
                             .format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        }
        
        // API 요청 URL 구성
        String requestUrl = "/site/program/financial/exchangeJSON?authkey=" + apiKey + "&searchdate=" + date + "&data=AP01";

        try {
        	System.out.println("service요청 API : "+requestUrl);
            return webClient.get()
                    .uri(requestUrl)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<List<Map<String, Object>>>() {})
                    .block(); // 동기 호출
        } catch (WebClientResponseException e) {
            System.err.println("API 호출 실패: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            throw new RuntimeException("외부 API 호출 중 오류 발생", e);
        } catch (Exception e) {
            System.err.println("알 수 없는 오류: " + e.getMessage());
            throw new RuntimeException("외부 API 호출 중 알 수 없는 오류 발생", e);
        }
    }
}
