package com.boot.sound.exchange;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
