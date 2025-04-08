package com.boot.sound.transfer.transMulti;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TransMultiDAO {
	public void addMultiTransfer(TransMultiDTO dto);
}
