package com.boot.sound.transfer.transMulti;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/transMulti")
public class TransMultiController {

	@Autowired
	private TransMultiService service;
	
	@PostMapping("/add")
	public String sendMulti(@RequestBody TransMultiDTO dto) {
		service.sendMulti(dto);
		
		return "다건이체요청 정상적으로 접수되었습니다.";
	}
}
