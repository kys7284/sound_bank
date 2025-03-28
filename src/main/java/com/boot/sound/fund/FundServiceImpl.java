package com.boot.sound.fund;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FundServiceImpl {
	
	@Autowired
	private FundRepository fundRepository;
	
	// 펀드상품 목록
	@Transactional
	public List<FundDTO> fundList() {
        return fundRepository.fundList();
    }
	
	// 펀드상품 등록
	@Transactional
	public int saveFund(FundDTO dto) {
		return fundRepository.insertFund(dto);
	}
	
	// 펀드상품 상세
	@Transactional
	public FundDTO fundDetail(int fund_id) {
		return fundRepository.findById(fund_id);
	}
	
	// 펀드상품 수정
	@Transactional
	public int updateFund(int fund_id, FundDTO dto) {
		
		return fundRepository.updateFund(dto);
	}
	
	// 펀드상품 삭제
	@Transactional
	public String deleteFund(int fund_id) {
		
		fundRepository.deleteFund(fund_id);
		
		return "펀드상품 삭제 완료";
	}

}
