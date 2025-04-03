package com.boot.sound.deposit;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name="DEPOSIT_ACCOUNT_TBL")
public class DepositDTO {

	@Id
	private String dat_account_num;
	private String dat_customer_name;
	private int dat_balance;
	private String dat_account_type;
	private Date dat_open_date;
	
	
}
