package com.boot.sound.transfer.transMulti;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.sound.transfer.transMulti.TransMultiDTO.InList;

@Service
public class TransMultiService {

    @Autowired
    private TransMultiDAO dao;

    // Thread -> 여러이체 동시 실행 
    // ThreadPool -> 미리 정해진 수의 Thread를 풀에 만들어놓고, 필요시 쓰고 다시 넣는 구조, 과부하 방지
    
	 // ThreadPool 사용 이유
	 // 스레드를 매번 새로 만들지 않고 재사용해서 성능이 좋아짐
	 // 동시에 실행되는 스레드 수를 제한해서 서버 과부하 방지
	 // 처리할 작업을 큐에 넣고 자동으로 관리되기 때문에 편리
	 // 많은 요청도 안정적으로 처리할 수 있어 대량 처리에 유리
	 // 자원 낭비 없이 효율적으로 동시 처리 가능
    
    // 최대 5개까지 동시에 처리하는 스레드 풀 생성
    private final ExecutorService pool = Executors.newFixedThreadPool(5);

    public void sendMulti(TransMultiDTO dto) {
        List<InList> list = dto.getInList();

        for (InList in : list) {
            // 각 이체 건마다 스레드에 작업 위임
            pool.submit(() -> {
                // 입금 정보 세팅
                InList inOne = new InList();
                inOne.setIn_account_number(in.getIn_account_number());
                inOne.setAmount(in.getAmount());
                inOne.setIn_name(in.getIn_name());
                inOne.setMemo(in.getMemo());

                // 1건의 이체 정보를 DTO로 구성
                TransMultiDTO one = new TransMultiDTO();
                one.setCustomer_id(dto.getCustomer_id());
                one.setOut_account_number(dto.getOut_account_number());
                one.setPassword(dto.getPassword());
                one.setMemo(in.getMemo());
                one.setInList(List.of(inOne));

                // DB에 저장 (요청 insert)
                dao.addMultiTransfer(one);
            });
        }
    }
}
