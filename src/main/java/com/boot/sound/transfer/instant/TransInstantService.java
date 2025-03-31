package com.boot.sound.transfer.instant;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.boot.sound.customer.CustomerDTO;
import com.boot.sound.customer.CustomerRepository;
import com.boot.sound.inquire.account.AccountRepository;
import com.boot.sound.inquire.transfer.TransActionDTO;
import com.boot.sound.inquire.transfer.TransActionRepository;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransInstantService {

    private final TransInstantRepository transRepo;        // 이체 저장용
    private final AccountRepository accountRepo;           // 잔액 변경용
    private final TransActionRepository taRepo;            // 거래내역 저장용
    private final CustomerRepository customerRepo;         // 고객 정보 조회용

    // 실시간 이체 처리 - 모든 작업은 하나의 트랜잭션 안에서 처리됨
    @Transactional
    public String send(TransInstantDTO dto) {

        // 1. 비밀번호 검증
        Optional<CustomerDTO> optional = customerRepo.findById(dto.getCustomer_id());
        if (!optional.isPresent()) return "고객 정보 없음";

        String realPw = optional.get().getCustomer_password();
        String inputPw = dto.getPassword();

        if (!inputPw.equals(realPw)) {
            return "비밀번호 오류"; // 비밀번호 불일치 시 실패
        }

        // 2. 출금: 잔액 차감 시도
        int minus = accountRepo.minusBalance(dto.getOut_account_number(), dto.getAmount());
        if (minus == 0) return "잔액 부족"; // 잔액 부족 시 실패

        // 3. 입금: 잔액 증가
        int plus = accountRepo.plusBalance(dto.getIn_account_number(), dto.getAmount());
        if (plus == 0) return "입금 실패";

        // 4. 거래내역 - 출금 기록
        TransActionDTO out = new TransActionDTO();
        out.setAccount_number(dto.getOut_account_number());
        out.setTransaction_type("출금");
        out.setAmount(dto.getAmount());
        out.setCurrency("KRW");
        out.setComment_out(dto.getMemo());
        out.setTransaction_date(new Date());
        taRepo.save(out);

        // 5. 거래내역 - 입금 기록
        TransActionDTO in = new TransActionDTO();
        in.setAccount_number(dto.getIn_account_number());
        in.setTransaction_type("입금");
        in.setAmount(dto.getAmount());
        in.setCurrency("KRW");
        in.setComment_in(dto.getMemo());
        in.setTransaction_date(new Date());
        taRepo.save(in);

        // 6. 이체 정보 저장 (TRANSFER_TBL)
        dto.setTransfer_type("실시간");
        dto.setTransfer_date(new Date());
        transRepo.save(dto);

        return "이체 완료"; // 성공
    }
}
