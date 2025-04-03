package com.boot.sound.exchange;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface AdminExchangeDAO {
	
	public List<ExchangeAccountRequestDTO> reqList();
}
