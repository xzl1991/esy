package com.esy.utils;

import javax.servlet.http.HttpSession;

public class SessionUtil {
	
	public static String getUserName(HttpSession session) {
		String username = session.getAttribute(Constants.USER_NAME).toString();
		return username;
	}
	
	public static String getNickName(HttpSession session) {
		String nickname = session.getAttribute(Constants.NICK_NAME).toString();
		return nickname;
	}
}
