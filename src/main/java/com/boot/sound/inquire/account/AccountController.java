package com.boot.sound.inquire.account;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin
@RequiredArgsConstructor
public class AccountController {

    private final AccountDAO accDAO;
    private final DepositAccountDAO depositDAO;
    private final ExchangeAccountDAO exchangeDAO;
    private final InstallmentSavingsDAO savingsDAO;

    // 고객 ID 기준 전체 보유 계좌 조회 (타입별 그룹화)
    @GetMapping("/allAccount/{customer_id}")
    public Map<String, List<Object>> getAllAccounts(@PathVariable("customer_id") String customer_id) {
        Map<String, List<Object>> result = new LinkedHashMap<>();

        // 입출금 계좌
        result.put("입출금", new ArrayList<>(accDAO.accountList(customer_id)));

        // 예금 계좌
        List<DepositAccountDTO> depositList = depositDAO.depositAccountList(customer_id);
        result.put("예금", new ArrayList<>(depositList));

        // 외환 계좌
        result.put("외환", new ArrayList<>(exchangeDAO.findByCustomerId(customer_id)));

        // 적금 계좌 (예금 계좌 번호 기준 조회)
        List<String> datAccountNums = depositList.stream()
                .map(DepositAccountDTO::getDat_account_num)
                .collect(Collectors.toList());

        result.put("적금", new ArrayList<>(savingsDAO.findByDatAccountNumList(datAccountNums)));

        return result;
    }
}
