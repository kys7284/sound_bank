package com.boot.sound.exchange;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface AdminExchangeDAO {
	
	// 계좌생성요청 목록
	public List<ExchangeAccountRequestDTO> reqList();
	
	// 계좌생성요청 상세조회
	public ExchangeAccountRequestDTO findById(long REQUEST_ID);

	// 계좌승인처리 
	public int approveAccount(long REQUEST_ID);
	
}
