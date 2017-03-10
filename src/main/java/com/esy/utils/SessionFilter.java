package com.esy.utils;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.web.filter.OncePerRequestFilter;

public class SessionFilter extends OncePerRequestFilter{
	private static Logger logger = Logger.getLogger(SessionFilter.class);
	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain chain) {
		String uri = request.getRequestURI();
		logger.warn("uri: " + uri);
		String[] urlFilter = {"main", "userconfig", "systemconfig"};//需要拦截
//		String[] urlFilter = {};	
		boolean doFilter = false;
		for (String url : urlFilter) {
			if(uri.indexOf(url) == 4) {
				doFilter = true;
				break;
			}
		}
		HttpSession session = request.getSession();
		Object username = session.getAttribute(Constants.USER_NAME);
		logger.warn("session:{ username: " + username + "}");
		if(doFilter == false || (doFilter == true && (username != null && !username.equals("")))) {
			try {
				chain.doFilter(request, response);
			} catch (Exception e) {
				logger.warn("传递过滤链异常：" + e.getMessage());
			}
		} else {
			logger.warn("username is null!");
		}
	}
	
	
}
