package com.boot.sound.fund;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface FundRepository {

	// 펀드상품 목록
	public List<FundDTO> fundList();
	
	// 펀드상품 등록
	public int insertFund(FundDTO dto);
	
	// 펀드상품 수정
	public int updateFund(FundDTO dto);
	
	// 펀드상품 삭제
	public int deleteFund(int fund_id);
	
	// 펀드상품 1건 조회
	public FundDTO findById(int fund_id);
	
}
