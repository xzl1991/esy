package com.esy.service;

import java.util.List;
import java.util.Map;

import com.esy.entity.Contract;

public interface ContractService {
	int deleteByPrimaryKey(String id);

	int insert(Contract record);

	Contract selectByPrimaryKey(String id);

	int updateByPrimaryKey(Contract record);

	int selectcount(Map<String, Object> paramaps);

	List<Contract> select(Map<String, Object> paramaps);
}
