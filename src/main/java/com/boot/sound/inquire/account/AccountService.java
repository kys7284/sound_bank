package com.boot.sound.inquire.account;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class AccountService {

    private final AccountDAO accDAO;
    private final DepositAccountDAO depDAO;
    private final ExchangeAccountDAO exDAO;
    private final InstallmentSavingsDAO installmentDAO;

    public AccountService(AccountDAO accDAO, DepositAccountDAO depDAO,
                          ExchangeAccountDAO exDAO,
                          InstallmentSavingsDAO installmentDAO) {
        this.accDAO = accDAO;
        this.depDAO = depDAO;
        this.exDAO = exDAO;
        this.installmentDAO = installmentDAO;
    }

    // 고객 ID 기준 전체 계좌 조회 후 타입별로 그룹화해서 리턴
    public Map<String, List<Object>> accountList(String customer_id) {
        // 입출금 계좌
        List<AccountDTO> basicAccounts = accDAO.accountList(customer_id);

        // 예금 계좌
        List<DepositAccountDTO> depositAccounts = depDAO.depositAccountList(customer_id);

        // 외환 계좌
        List<ExchangeAccountDTO> exchangeAccounts = exDAO.findByCustomerId(customer_id);

        // 적금 계좌 조회용 예금계좌번호만 추출
        List<String> datAccountNums = new ArrayList<>();
        for (DepositAccountDTO deposit : depositAccounts) {
            datAccountNums.add(deposit.getDat_account_num());
        }

        // 적금 계좌 (예금 계좌 번호 기준으로 조회)
        List<InstallmentSavingsDTO> installmentAccounts = installmentDAO.findByDatAccountNumList(datAccountNums);

        // 결과 정리해서 리턴
        Map<String, List<Object>> result = new LinkedHashMap<>();
        result.put("입출금", new ArrayList<>(basicAccounts));
        result.put("예금", new ArrayList<>(depositAccounts));
        result.put("외환", new ArrayList<>(exchangeAccounts));
        result.put("적금", new ArrayList<>(installmentAccounts));

        return result;
    }
}
