package com.boot.sound.exchange;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/exAdmin")
@CrossOrigin
public class AdminExchangeController {
	
	@Autowired
	private AdminExchangeService service;
	
	@GetMapping("/account/list")
	public ResponseEntity<List<ExchangeAccountRequestDTO>> exchangeAccountList(){
		
		System.out.println("Controller - exchangeAccountList");
		
		
		return new ResponseEntity<>(service.exAccountList(),HttpStatus.OK);
	}

	@PostMapping("/account/approve")
	public ResponseEntity<?> approveAccount(@RequestBody long REQUEST_ID) {
		System.out.println("Controller - approveAccount");
		System.out.println("REQUEST_ID = " + REQUEST_ID);
		
		return new ResponseEntity<>(service.approveAccount(REQUEST_ID),HttpStatus.OK);
	}
	

}
