package com.boot.sound.loan;

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
@Table(name="LOAN_AGREE_STATUS_TBL")
public class LoanConsentDTO {
	
	@Id
	private int agree_status_id;
	private int loan_id;
	private String consent_to_use;
	private String consent_to_view;
	
}
