package com.boot.sound.inquire.account;

import lombok.Data;
import java.sql.Timestamp;

@Data
public class ExchangeAccountDTO {
    private long exchange_account_id;
    private String exchange_account_number;
    private String customer_id;
    private String exchange_account_name;
    private String base_currency;
    private double balance;
    private Timestamp created_at;
    private Timestamp updated_at;
    private String status;
}
