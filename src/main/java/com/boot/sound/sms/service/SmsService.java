package com.boot.sound.sms.service;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@Service
public class SmsService {

    // CoolSMS API 인증 정보 (application.yml 또는 properties에 설정)
    @Value("${coolsms.api.key}")
    private String apiKey;

    @Value("${coolsms.api.secret}")
    private String apiSecret;

    // 발신자 번호 (CoolSMS에 등록된 번호)
    @Value("${coolsms.api.sender}")
    private String senderPhoneNumber;
    
    // API 제공 URL (SDK 초기화 시 필요)
    @Value("${coolsms.api.provider}")
    private String providerUrl;
    
    // Nurigo SDK를 이용한 메시지 서비스
    private DefaultMessageService messageService;
    
    // (예제용) 인증 코드를 임시 저장하는 in-memory 저장소
    private final Map<String, String> verificationCodes = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        // SDK 초기화: NurigoApp.INSTANCE.initialize() 메서드를 통해 messageService 생성
        // providerUrl은 "https://api.coolsms.co.kr" 형태로 지정됩니다.
        this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, providerUrl);
    }

    public boolean sendVerificationSms(String phoneNumber) {
        // 6자리 인증 코드 생성
        String verificationCode = generateVerificationCode();
        // 실제 운영 환경에서는 만료시간을 설정하고 DB나 Redis 등에 저장하는 것이 좋습니다.
        verificationCodes.put(phoneNumber, verificationCode);

        // 메시지 구성
        Message message = new Message();
        // 발신번호와 수신번호는 반드시 '-'나 공백 없이 숫자만 포함된 형식 (예: "01012345678")이어야 합니다.
        message.setFrom(senderPhoneNumber);
        message.setTo(phoneNumber);
        message.setText("Your verification code is: " + verificationCode);

        try {
            // SDK를 통한 단일 메시지 발송
            SingleMessageSentResponse response = messageService.sendOne(
                    new SingleMessageSendingRequest(message)
            );
            // SDK 문서에 따르면, response.getStatusCode()가 200이면 성공입니다.
            // getStatusCode()가 int 또는 String일 수 있으므로, String.valueOf()로 문자열 변환 후 비교합니다.
            return "200".equals(String.valueOf(response.getStatusCode()));
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    // 6자리 난수 생성 
    private String generateVerificationCode() {
        int code = (int)(Math.random() * 900000) + 100000;
        return String.valueOf(code);
    }

    // 필요에 따라 인증 코드 검증 메소드 추가 가능
    public boolean verifyCode(String phoneNumber, String code) {
        String storedCode = verificationCodes.get(phoneNumber);
        // 만료 시간 확인 로직도 추가하면 좋습니다.
        return code != null && code.equals(storedCode);
    }
}
