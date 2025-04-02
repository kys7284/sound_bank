package com.boot.sound.fund;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class FundController {

    @Autowired
    private FundServiceImpl service;
    
    private static final Logger logger = LoggerFactory.getLogger(FundController.class);

    // 펀드상품 목록 => http://localhost:8081/api/fundList  
    @GetMapping("/fundList")
    public ResponseEntity<List<FundDTO>> findAll() {
    	
    	logger.info("<<< contoller - fundList >>>");
        return new ResponseEntity<>(service.fundList(), HttpStatus.OK);		// 200
    }
    
    // 펀드상품 등록 PostMapping => http://localhost:8081/api/fundSave
    @PostMapping("/fundSave")
    public ResponseEntity<?> save(@RequestBody FundDTO funds) {
    	logger.info("<<< contoller - save >>>");
    	
    	return new ResponseEntity<>(service.saveFund(funds), HttpStatus.CREATED);	// 201 상태값 리턴
    	
    }
    
    // 등록된 펀드 상품 목록 조회
    @GetMapping("/registeredFunds")
    public List<FundDTO> getRegisteredFunds() {
        return service.getRegisteredFunds();
    }
    
    // 펀드상품 상세보기 => http://localhost:8081/api/fundDetail/{fund_id} (펀드상품번호)
    @GetMapping("/fundDetail/{fund_id}")
    public ResponseEntity<FundDTO> findById(@PathVariable Long fund_id) {
    	logger.info("<<< contoller - findById >>>");
    	
    	return new ResponseEntity<FundDTO>(service.fundDetail(fund_id), HttpStatus.OK);	// 200
    	
    }
    
 	// 펀드상품 수정 @PutMapping => http://localhost:8081/api/fundUpdate/{fund_id} (펀드상품번호)
    @PutMapping("/fundUpdate/{fund_id}")
    public ResponseEntity<Integer> updateFund(@PathVariable Long fund_id, @RequestBody FundDTO funds) {
    	logger.info("<<< contoller - updateFund >>>");
    	
    	return new ResponseEntity<>(service.updateFund(fund_id, funds), HttpStatus.CREATED);	// 201
    }
    
 	// 펀드상품 삭제 DeleteMapping => http://localhost:8081/api/fund/{fund_id} (펀드상품번호)
    @DeleteMapping("/fund/{fund_id}")
    public ResponseEntity<String> deleteFund(@PathVariable Long fund_id) {
        service.deleteFund(fund_id);
        return ResponseEntity.ok("펀드 삭제 성공");
    }
    
}
