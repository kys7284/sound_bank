package com.boot.sound.exchange;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminExchangeService {
	
	@Autowired
	private AdminExchangeDAO dao;
	
	public List<ExchangeAccountRequestDTO> exAccountList(){
		System.out.println("Service - exAccountList");
		
		return dao.reqList();
	}
}
