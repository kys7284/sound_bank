package com.boot.sound.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public boolean checkId(String customer_id) {
    	return customerRepository.existsById(customer_id);  
    	}

    // 계좌개설
    public void registerCustomer(CustomerDTO customer) {
    	// 고객 계좌번호를 현재 시간(밀리초)으로 자동생성  => (향후 UUID 방식으롱 개선고려 - 안전성 향상)
        customer.setCustomer_account_number(System.currentTimeMillis());
        
        // 주민등록번호 '-' 제거
        String customerResidentNumber = String.valueOf(customer.getCustomer_resident_number()).replaceAll("-", "");
        customer.setCustomer_resident_number(customerResidentNumber);
        
        // 전화번호 '-' 제거
        String phoneNumber = String.valueOf(customer.getCustomer_phone_number()).replaceAll("-", "");
        customer.setCustomer_phone_number(phoneNumber);
        
        // 고객정보 데이터베이스에 저장
        customerRepository.save(customer);
    }
    
    // 로그인
    public CustomerDTO login(String id, String password) {
        return customerRepository.findById(id)
                .filter(c -> c.getCustomer_password().equals(password))
                .orElse(null);
    }
    
}