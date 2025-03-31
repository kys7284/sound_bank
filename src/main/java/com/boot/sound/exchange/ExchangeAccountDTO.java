package com.boot.sound.exchange;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="EXCHANGE_ACCOUNT")
public class ExchangeAccountDTO {

	@Id
	private int exchange_account_id;
	private String exchange_account_number;
	private String customer_id;
	private String exchange_account_name;
	private String base_currency;
	private int balance;
	private Timestamp created_at;
	private Timestamp updated_at;
	private String status;	
}
