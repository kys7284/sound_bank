package com.boot.sound.exchange;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ExchangeDAO {
	
	public void requestExchange(ExchangeRequestDTO dto);
	
	public ExchangeRequestDTO selectExchangeRequestById(int id);
}
