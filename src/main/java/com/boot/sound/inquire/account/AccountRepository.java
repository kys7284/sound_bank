package com.boot.sound.inquire.account;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

import javax.transaction.Transactional;

@Repository
public interface AccountRepository extends CrudRepository<AccountDTO, String> {

	@Query("SELECT a FROM AccountDTO a WHERE a.customer_id = :customer_id")
	List<AccountDTO> findAccountsByCustomerId(@Param("customer_id") String customer_id);
	 
    // 출금 - 잔액 감소 (잔액이 충분할 때만)
    @Modifying
    @Transactional
    @Query("UPDATE AccountDTO a SET a.balance = a.balance - :money WHERE a.account_number = :acc AND a.balance >= :money")
    int minusBalance(@Param("acc") String acc, @Param("money") Integer  money);

    // 입금 - 잔액 증가
    @Modifying
    @Transactional
    @Query("UPDATE AccountDTO a SET a.balance = a.balance + :money WHERE a.account_number = :acc")
    int plusBalance(@Param("acc") String acc, @Param("money") Integer  money);

}