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
	@Transactional(readOnly=true)
	public List<FundDTO> fundList() {
		System.out.println("서비스 - fundList");
        return fundRepository.fundList();
    }
	
	// 펀드상품 등록
	@Transactional
	public int saveFund(FundDTO dto) {
		System.out.println("서비스 - saveFund");
		return fundRepository.insertFund(dto);
	}
	
	// 등록된 펀드 상품 목록 조회
	@Transactional
    public List<FundDTO> getRegisteredFunds() {
        return fundRepository.getRegisteredFunds();
    }
	 
	// 펀드상품 상세
	@Transactional
	public FundDTO fundDetail(Long fund_id) {
		System.out.println("서비스 - fundDetail");
		return fundRepository.findById(fund_id);
	}
	
	// 펀드상품 수정
	@Transactional
	public int updateFund(Long fund_id, FundDTO dto) {
		System.out.println("서비스 - updateFund");
		return fundRepository.updateFund(dto);
	}
	
	// 펀드상품 삭제
	@Transactional
    public void deleteFund(Long fund_id) {
        int rowsAffected = fundRepository.deleteFund(fund_id); // 반환값 처리
        if (rowsAffected == 0) {
            throw new IllegalArgumentException("삭제할 펀드가 존재하지 않습니다.");
        }
    }
	
	// 투자 성향 테스트 등록
	@Transactional
	public int saveFundTestResult(FundTestDTO test) {
		System.out.println("서비스 - saveFundTestResult");
		return fundRepository.insertTestResult(test);
	}

}
