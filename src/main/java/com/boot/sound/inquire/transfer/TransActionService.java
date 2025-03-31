package com.boot.sound.inquire.transfer;

import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransActionService {

    private final TransActionRepository TransActionRepository;

    public TransActionService(TransActionRepository transactionRepository) {
        this.TransActionRepository = transactionRepository;
    }

    public List<TransActionDTO> getTransactions(String account_number, Date start_date, Date end_date, String transaction_type) {

        // end_date를 하루의 끝으로 조정 (23:59:59)
        Calendar cal = Calendar.getInstance();
        cal.setTime(end_date);
        cal.set(Calendar.HOUR_OF_DAY, 23);
        cal.set(Calendar.MINUTE, 59);
        cal.set(Calendar.SECOND, 59);
        cal.set(Calendar.MILLISECOND, 999);
        end_date = cal.getTime();

        List<TransActionDTO> result;

        // 거래유형이 전체인 경우: 유형 없이 조회
        if (transaction_type.equals("전체")) {
            result = TransActionRepository.findByAccountAndDate(account_number, start_date, end_date);
        } else {
            result = TransActionRepository.findByAccountDateAndType(account_number, start_date, end_date, transaction_type);
        }

        return result.stream().map(t -> {
            TransActionDTO dto = new TransActionDTO();
            dto.setTransaction_id(t.getTransaction_id());
            dto.setAccount_number(t.getAccount_number());
            dto.setTransaction_type(t.getTransaction_type());
            dto.setAmount(t.getAmount());
            dto.setCurrency(t.getCurrency());
            dto.setComment_out(t.getComment_out());
            dto.setComment_in(t.getComment_in());
            dto.setTransaction_date(t.getTransaction_date());
            return dto;
        }).collect(Collectors.toList());
    }
}