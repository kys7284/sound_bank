package com.boot.sound.inquire.account;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface ExchangeAccountDAO {
    List<ExchangeAccountDTO> findByCustomerId(String customer_id);
}