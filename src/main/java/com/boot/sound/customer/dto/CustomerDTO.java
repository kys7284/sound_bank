package com.boot.sound.customer.dto;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "CUSTOMER_TBL")
public class CustomerDTO {

    @Id
    @Column(name = "CUSTOMER_ID", nullable = false, length = 20)
    private String customer_id;
    
    @Column(name = "CUSTOMER_NAME", nullable = false, length = 20)
    private String customer_name;

    @Column(name = "CUSTOMER_PASSWORD", nullable = false, length = 15)
    private String customer_password;

    @Column(name = "CUSTOMER_RESIDENT_NUMBER", nullable = false, length = 20)
    private String customer_resident_number;
    
	@Column(name = "CUSTOMER_ADDRESS", nullable = false, columnDefinition = "CLOB")
    private String customer_address;

    @Column(name = "CUSTOMER_PHONE_NUMBER")
    private String customer_phone_number;

    @Column(name = "CUSTOMER_EMAIL", length = 20)
    private String customer_email;

    @Column(name = "CUSTOMER_JOB", length = 10)
    private String customer_job;

    @Column(name = "CUSTOMER_ACCOUNT_NUMBER", nullable = false)
    private Long customer_account_number;

    @Column(name = "CUSTOMER_BIRTHDAY", length = 20)
    private String customer_birthday;

    @Column(name = "CUSTOMER_RISK_TYPE", length = 20)
    private String customer_risk_type;
    
	public CustomerDTO() {
		super();
	}

	public CustomerDTO(String customer_id, String customer_name, String customer_password,
			String customer_resident_number, String customer_address, String customer_phone_number,
			String customer_email, String customer_job, Long customer_account_number, String customer_birthday,
			String customer_risk_type) {
		super();
		this.customer_id = customer_id;
		this.customer_name = customer_name;
		this.customer_password = customer_password;
		this.customer_resident_number = customer_resident_number;
		this.customer_address = customer_address;
		this.customer_phone_number = customer_phone_number;
		this.customer_email = customer_email;
		this.customer_job = customer_job;
		this.customer_account_number = customer_account_number;
		this.customer_birthday = customer_birthday;
		this.customer_risk_type = customer_risk_type;
	}

	public String getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(String customer_id) {
		this.customer_id = customer_id;
	}

	public String getCustomer_name() {
		return customer_name;
	}

	public void setCustomer_name(String customer_name) {
		this.customer_name = customer_name;
	}

	public String getCustomer_password() {
		return customer_password;
	}

	public void setCustomer_password(String customer_password) {
		this.customer_password = customer_password;
	}

	public String getCustomer_resident_number() {
		return customer_resident_number;
	}

	public void setCustomer_resident_number(String customer_resident_number) {
		this.customer_resident_number = customer_resident_number;
	}

	public String getCustomer_address() {
		return customer_address;
	}

	public void setCustomer_address(String customer_address) {
		this.customer_address = customer_address;
	}

	public String getCustomer_phone_number() {
		return customer_phone_number;
	}

	public void setCustomer_phone_number(String customer_phone_number) {
		this.customer_phone_number = customer_phone_number;
	}

	public String getCustomer_email() {
		return customer_email;
	}

	public void setCustomer_email(String customer_email) {
		this.customer_email = customer_email;
	}

	public String getCustomer_job() {
		return customer_job;
	}

	public void setCustomer_job(String customer_job) {
		this.customer_job = customer_job;
	}

	public Long getCustomer_account_number() {
		return customer_account_number;
	}

	public void setCustomer_account_number(Long customer_account_number) {
		this.customer_account_number = customer_account_number;
	}

	public String getCustomer_birthday() {
		return customer_birthday;
	}

	public void setCustomer_birthday(String customer_birthday) {
		this.customer_birthday = customer_birthday;
	}

	public String getCustomer_risk_type() {
		return customer_risk_type;
	}

	public void setCustomer_risk_type(String customer_risk_type) {
		this.customer_risk_type = customer_risk_type;
	}

	@Override
	public String toString() {
		return "CustomerDTO [customer_id=" + customer_id + ", customer_name=" + customer_name + ", customer_password="
				+ customer_password + ", customer_resident_number=" + customer_resident_number + ", customer_address="
				+ customer_address + ", customer_phone_number=" + customer_phone_number + ", customer_email="
				+ customer_email + ", customer_job=" + customer_job + ", customer_account_number="
				+ customer_account_number + ", customer_birthday=" + customer_birthday + ", customer_risk_type="
				+ customer_risk_type + "]";
	}
}