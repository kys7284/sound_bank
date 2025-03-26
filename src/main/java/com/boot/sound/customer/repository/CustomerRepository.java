package com.boot.sound.customer.repository;

import com.boot.sound.customer.dto.CustomerDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<CustomerDTO, String> {
}