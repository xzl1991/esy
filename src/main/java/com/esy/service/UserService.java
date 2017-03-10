package com.esy.service;

import java.util.List;
import java.util.Map;

import com.esy.entity.User;
@SuppressWarnings("rawtypes")
public interface UserService {
	
	List<User> finduser(Map map);
	
	int querycount(Map map);

	void insertUser(User user);
}
