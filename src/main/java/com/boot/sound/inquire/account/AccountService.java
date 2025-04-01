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
        Map<String, List<AccountDTO>> grouped = new LinkedHashMap<>();
        grouped.put("입출금", new ArrayList<>());
        grouped.put("예금", new ArrayList<>());
        grouped.put("적금", new ArrayList<>());
        grouped.put("외환", new ArrayList<>());

        for (AccountDTO account : allAccounts) {
            String type = account.getAccount_type();
            if (grouped.containsKey(type)) {
                grouped.get(type).add(account);
            }
        }

        return grouped;
    }
}
