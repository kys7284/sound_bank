package com.boot.sound.inquire.account;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface DepositAccountDAO {

   public List<DepositAccountDTO> findByCustomerId(String customer_id);
	 
    // 고객 ID로 예금 계좌 목록 조회
   public List<DepositAccountDTO> depositAccountList(String customer_id);
}
