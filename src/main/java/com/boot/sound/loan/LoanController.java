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
import org.springframework.web.bind.annotation.RequestParam;
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
	
	// 대출 상품 삭제 http://localhost:8081/api/loanDelete
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
	
	// 대출 상품 전체 갯수 http://localhost:8081/api/loanCnt
	@GetMapping("/loanCnt")
	public ResponseEntity<?> loanCnt(){
		System.out.println("컨트롤 - loanCnt()");
		return new ResponseEntity<>(service.loanCnt(),HttpStatus.CREATED);
	}
	
	// 대출 유형 맞춤검사 http://localhost:8081/api/loanTypeSearch/{loan_type}
	@GetMapping("/loanTypeSearch/")
	public ResponseEntity<?> loanTypeSearch(@RequestParam("loan_type") String loan_type){
		System.out.println("컨트롤 - loanTypeSearch()");
		return new ResponseEntity<>(service.loanTypeSearch(loan_type),HttpStatus.CREATED);
	}
	
	// 대출 유형 맞춤검사 http://localhost:8081/api/loanTypeCnt/{loan_type}
	@GetMapping("/loanTypeCnt/")
	public ResponseEntity<?> loanTypeCnt(@RequestParam("loan_type") String loan_type){
		System.out.println("컨트롤 - loanTypeCnt()");
		return new ResponseEntity<>(service.loanTypeCnt(loan_type),HttpStatus.CREATED);
	}
	
	// 대출이름검색 http://localhost:8081/api/loanNameSearch/{loan_type}
	@GetMapping("/loanNameSearch/")
	public ResponseEntity<?> loanNameSearch(@RequestParam("loan_name") String loan_name){
		System.out.println("컨트롤 - loanNameSearch()");
		return new ResponseEntity<>(service.loanNameSearch(loan_name),HttpStatus.CREATED);
	}
	
	// 대출이름 검색 결과 카운트 http://localhost:8081/api/loanNameCnt/{loan_type}
	@GetMapping("/loanNameCnt/")
	public ResponseEntity<?> loanNameCnt(@RequestParam("loan_name") String loan_name){
		System.out.println("컨트롤 - loanNameCnt()");
		return new ResponseEntity<>(service.loanNameCnt(loan_name),HttpStatus.CREATED);
	}
	
	
	
}
