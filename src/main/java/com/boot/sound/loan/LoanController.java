package com.boot.sound.loan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class LoanController {

	@Autowired
	private LoanService service;
	
	// http://localhost:8081/api
	
	// 대출 상품 리스트 http://localhost:8081/api/loanList
	@GetMapping("/loanList")
	public ResponseEntity<?> loanList(){
		System.out.println("loanList()");
		return new ResponseEntity<>(service.loanList(),HttpStatus.OK);
	};
	
	// 대출 상품 등록 http://localhost:8081/api/loanInsert
	@PostMapping("/loanInsert")
	public ResponseEntity<?> loanInsert(@RequestBody LoanDTO dto){
		System.out.println("loanInsert");
		return new ResponseEntity<>(service.loanInsert(dto),HttpStatus.CREATED);
	};
	
	// 대출 상품 수정
	@PutMapping("/loanUpdate/{loan_id}")
	public ResponseEntity<?> loanUpdate(@PathVariable int loan_id, @RequestBody LoanDTO dto){
		System.out.println("loanUpdate");
		return new ResponseEntity<>(service.loanUpdate(loan_id,dto),HttpStatus.CREATED);
	}
	
	// 대출 상품 삭제
	@DeleteMapping("/loanDelete/{loan_id}")
	public ResponseEntity<?> loanDelete(@PathVariable int loan_id){
		System.out.println("loanDelete");
		return new ResponseEntity<>(service.loanDelete(loan_id),HttpStatus.OK);
	}
	
	// 대출 상품 상세 http://localhost:8081/api/loanDetail/{loan_id}
	@GetMapping("/loanDetail/{loan_id}")
	public ResponseEntity<?> loanDetail(@PathVariable int loan_id){
		System.out.println("loanDetail");
		return new ResponseEntity<>(service.loanDetail(loan_id),HttpStatus.OK);
	}
	
	
}
