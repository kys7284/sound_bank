package com.boot.sound.inquire.account;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface InstallmentSavingsDAO {
    List<InstallmentSavingsDTO> findByDatAccountNumList(List<String> datAccountNums);
}
