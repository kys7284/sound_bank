package com.boot.sound.inquire.transfer;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/transactions")
public class TransActionController {

    private final TransActionService transActionService;

    // 생성자 주입
    public TransActionController(TransActionService transActionService) {
        this.transActionService = transActionService;
    }

    // 거래내역 조회용 API
    // 예: /api/transactions?accountNumber=12345&startDate=2025-01-01&endDate=2025-03-28&type=입금
    @GetMapping
    public List<TransActionDTO> getTransactions(
    	    @RequestParam("account_number") String accountNumber,
    	    @RequestParam("start_date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
    	    @RequestParam("end_date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
    	    @RequestParam("transaction_type") String transactionType
    	) {
    	    return transActionService.getTransactions(accountNumber, startDate, endDate, transactionType);
    	}
}
