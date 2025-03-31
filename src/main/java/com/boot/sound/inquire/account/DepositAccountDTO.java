package com.boot.sound.inquire.account;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "DEPOSIT_ACCOUNT_TBL")
public class DepositAccountDTO {

    @Id
    @Column(name = "DAT_ACCOUNT_NUM")
    private String dat_account_num;

    @Column(name = "CUSTOMER_ID")
    private String customer_id;

    @Column(name = "DAT_CUSTOMER_NAME")
    private String dat_customer_name;

    @Column(name = "DAT_BALANCE")
    private Long dat_balance;

    @Column(name = "DAT_ACCOUNT_TYPE")
    private String dat_account_type;

    @Column(name = "DAT_OPEN_DATE")
    private Date dat_open_date;
}


