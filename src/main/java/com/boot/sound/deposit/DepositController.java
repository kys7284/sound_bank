package com.boot.sound.deposit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/deposits")
@CrossOrigin
public class DepositController {
	
       @Autowired
       private DepositService depositservice;
       
       
   	@GetMapping("/DepositList")
   	public ResponseEntity<?> loanList(){
   		System.out.println("depositList()");
   		return new ResponseEntity<>(depositservice.DepositList(),HttpStatus.OK);
   		
   	};
		
		

	

}
