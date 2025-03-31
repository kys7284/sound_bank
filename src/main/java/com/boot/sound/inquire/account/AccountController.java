package com.boot.sound.inquire.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService service;

    @GetMapping("/allAccount/{customer_id}")
    public Map<String, List<AccountDTO>> getAllAccounts(@PathVariable String customer_id) {
        return service.getAccountsGroupedByType(customer_id);
    }
}
