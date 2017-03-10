package com.esy.service;

import java.util.List;
import java.util.Map;

import com.esy.entity.Provider;

public interface ProviderService {

	int deleteByPrimaryKey(String id);

	int insert(Provider record);


	Provider selectByPrimaryKey(String id);


	int updateByPrimaryKey(Provider record);

	List<Provider> select(Map<String, Object> paramaps);

	int selectcount(Map<String, Object> paramaps);

	List<Map<String, Object>> queryComBo();
}
