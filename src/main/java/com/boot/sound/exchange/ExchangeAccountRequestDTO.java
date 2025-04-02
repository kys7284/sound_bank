package com.boot.sound.exchange;

import java.sql.Timestamp;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
public class ExchangeAccountRequestDTO {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long REQUEST_ID;
	
	@JsonProperty("CUSTOMER_ID")
	private String CUSTOMER_ID;
    
	@JsonProperty("WITHDRAW_ACCOUNT_NUMBER")
	private String WITHDRAW_ACCOUNT_NUMBER;
	
	@JsonProperty("CURRENCY_TYPE")
    private String CURRENCY_TYPE;
	
	@JsonProperty("EXCHANGE_ACCOUNT_PWD")
    private int EXCHANGE_ACCOUNT_PWD;

	@JsonProperty("REQUEST_DATE")
	private Timestamp REQUEST_DATE; 
	
	@JsonProperty("STATUS")
	private String STATUS;
}
