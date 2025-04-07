package com.boot.sound.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<CustomerDTO, String> {

	@Query("SELECT c.customer_password FROM CustomerDTO c WHERE c.customer_id = :customer_id")
	String findPasswordById(@Param("customer_id") String customer_id);
}