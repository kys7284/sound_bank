package com.boot.sound.inquire.account;

import lombok.Data;
import java.util.Date;

@Data
public class InstallmentSavingsDTO {
    private String ist_id;
    private String ist_account_num;
    private Date ist_start_date;
    private Date ist_end_date;
    private double ist_monthly_amount;
    private double ist_interest_rate;
}
