package com.esy.action;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.jdbc.support.incrementer.MySQLMaxValueIncrementer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.esy.entity.User;
import com.esy.service.UserService;
import com.esy.utils.MD5Util;

@Controller
public class TestController {
	private static Logger logger = Logger.getLogger(Login.class);
	@Resource
	UserService userService;
	@Resource
	MySQLMaxValueIncrementer increaseId;
	@RequestMapping("index")
	public String index(){
		return "testUser";
	}
	@RequestMapping("tree")
	public String tree(){
		return "tree";
	}
	@RequestMapping("layout")
	public String layout(){
		return "layOut";
	}
	@RequestMapping("/getUser")
	public void login(HttpServletRequest request, HttpServletResponse response, @RequestBody String jsons){
		String result = "";
			response.setCharacterEncoding("utf-8");
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			//获取session中保存的验证码
			logger.warn("username: " + username + ", password: " + password);
			
			Map<String, Object> paraMap = new HashMap<String, Object>();
//			paraMap.put("username", username);
//			paraMap.put("password", MD5Util.string2MD5(password));
//			UsernamePasswordToken token = new UsernamePasswordToken(username, MD5Util.string2MD5(password));
//			Subject subject = SecurityUtils.getSubject();
			try {

				Session session2 = SecurityUtils.getSubject().getSession();
				session2.setAttribute("name", "guanjei");
				PrintWriter out = response.getWriter();
				response.setCharacterEncoding("utf-8");
//				subject.login(token);
//				session.setAttribute(Constants.USER_NAME, username);
				Map<String, Object> paras = new HashMap<String, Object>();
				paras.put("start", 0);
				paras.put("limit", 4);
				paras.put("username", "root");
				int total = userService.querycount(paras);
				List<User> users = userService.finduser(paras);
				jsons = "{\"total\":"+200 + ", \"root\":" + JSONArray.fromObject(users) + "}";
				out.write(jsons);
				System.out.println("****:"+jsons);
				logger.warn("jsons: " + jsons);
				out.flush();
				out.close();
			} catch (Exception e) {
				result = "index";
//				session.setAttribute(Constants.USER_NAME, username);
			}
//				return result = "loginpage";
	}
}
