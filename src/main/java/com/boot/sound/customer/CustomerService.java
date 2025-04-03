package com.boot.sound.customer;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.boot.sound.inquire.account.AccountDAO;
import com.boot.sound.inquire.account.AccountDTO;
import java.math.BigDecimal; 
@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private AccountDAO accountDAO;
    
    public boolean checkId(String customer_id) {
    	return customerRepository.existsById(customer_id);  
    	}

    // 계좌개설
    public void registerCustomer(CustomerDTO customer) {
    	// 고객 계좌번호를 현재 시간(밀리초)으로 자동생성  => (향후 UUID 방식으롱 개선고려 - 안전성 향상)
    	String millis = String.valueOf(System.currentTimeMillis());

    	// 계좌번호 자르기
    	String part1 = millis.substring(0, 3);      
    	String part2 = millis.substring(3, 9);      
    	String part3 = millis.substring(9);         

    	String accountNumber = part1 + "-" + part2 + "-" + part3;

    	customer.setCustomer_account_number(accountNumber);
        
        // 고객정보 데이터베이스에 저장
        customerRepository.save(customer);
        
        // 2. 입출금 계좌 자동 생성
        AccountDTO account = new AccountDTO();
        account.setAccount_number(accountNumber);
        account.setCustomer_id(customer.getCustomer_id());
        account.setAccount_type("입출금");
        account.setBalance(BigDecimal.valueOf(0));
        account.setInterest_rate(BigDecimal.valueOf(0.0));
        account.setYield_rate(BigDecimal.valueOf(0.0));
        account.setCurrency_type("KRW");
        account.setAccount_name("기본 입출금 계좌");
        account.setOpen_date(new java.util.Date());

        accountDAO.insertAccount(account); // 계좌 저장
    }
    
    // 로그인
    public CustomerDTO login(String id, String password) {
        return customerRepository.findById(id)
                .filter(c -> c.getCustomer_password().equals(password))
                .orElse(null);
    }
    
}