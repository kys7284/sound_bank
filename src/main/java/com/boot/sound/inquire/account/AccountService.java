package com.boot.sound.inquire.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class AccountService {

    @Autowired
    private AccountDAO accountDAO;

    public Map<String, List<AccountDTO>> getAccountsGroupedByType(String customer_id) {
        List<AccountDTO> allAccounts = accountDAO.findAllByCustomerId(customer_id);

        // 타입별로 그룹핑
        // LinkedHashMap > 순서 유지를 위해 쓰임 
        Map<String, List<AccountDTO>> grouped = new LinkedHashMap<>();
        
        // 키 값 설정한 빈바구니 미리 만들어둠 
        grouped.put("입출금", new ArrayList<>());
        grouped.put("예금", new ArrayList<>());
        grouped.put("적금", new ArrayList<>());
        grouped.put("외환", new ArrayList<>());

        // 전체계좌 반복하며 타입별로 분류 
        for (AccountDTO account : allAccounts) {		// 전체 계좌 목록을 하나씩 꺼내서 account라는 변수로 반복
            String type = account.getAccount_type();	// 계좌 타입 확인
            if (grouped.containsKey(type)) {			// 타입이 MAP에 있는 키인지 확인 
                grouped.get(type).add(account);			// 해당타입에 바구니에 추가
            }
        }

        return grouped;
    }
}
