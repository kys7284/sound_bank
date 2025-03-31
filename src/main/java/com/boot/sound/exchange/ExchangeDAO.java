package com.boot.sound.exchange;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.boot.sound.customer.CustomerDTO;

@Mapper
@Repository
public interface ExchangeDAO {
	// 환전 요청
	public void requestExchange(ExchangeRequestDTO dto);
	
	// 고객 계좌 조회
	public CustomerDTO findbyId(String customer_id);
}
