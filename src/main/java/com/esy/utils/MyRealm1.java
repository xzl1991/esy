package com.esy.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;

import com.esy.entity.User;
import com.esy.service.UserService;

public class MyRealm1 extends AuthorizingRealm{
	private static Logger logger = Logger.getLogger(MyRealm1.class);
	@Resource
	UserService userService;

	
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection arg0) {
		// TODO Auto-generated method stub
		return null;
	}
	public AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken arg0)
			throws AuthenticationException {
		logger.warn("进入getAuthenticationInfo*****");
		UsernamePasswordToken token = (UsernamePasswordToken)arg0;
		Map<String, Object> paras = new HashMap<String, Object>();
		paras.put("username", token.getUsername());
		paras.put("password", new String(token.getPassword()));
		List<User> users = userService.finduser(paras);
		logger.warn("users.size: " + users.size());
		if(users != null && !users.isEmpty()) {
			Session session = SecurityUtils.getSubject().getSession();
			User user = users.get(0);
			session.setAttribute(Constants.USER_NAME, user.getUsername());
			session.setAttribute(Constants.NICK_NAME, user.getNickname());
			return new SimpleAuthenticationInfo(token.getUsername(), token.getPassword(), getName());
		}
		return null;
	}
	public MyRealm1() {
		logger.warn("MyRealm1实例化");
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	
}
