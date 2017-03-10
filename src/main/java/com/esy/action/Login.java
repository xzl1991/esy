package com.esy.action;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.support.incrementer.MySQLMaxValueIncrementer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.esy.entity.User;
import com.esy.service.UserService;
import com.esy.utils.Constants;
import com.esy.utils.MD5Util;
import com.esy.utils.SessionUtil;

@RequestMapping("/login")
@Controller
@Scope("prototype")
public class Login {
	@RequestMapping("/hello")
	public ModelAndView handleRequest(HttpServletRequest arg0,
			HttpServletResponse arg1) throws Exception {
		//1.收集参数 验证参数
		//2.绑定参数到对象
		//3.将命令对象传到业务对象处理
		//4.选择下一个页面
		
		ModelAndView mv = new ModelAndView();
		mv.addObject("message","HelloWorld");
		//设置视图名，视图解析器会根据改名字 解析到具体页面
		mv.setViewName("hello");
		// TODO Auto-generated method stub
		return mv;
	}
	private static Logger logger = Logger.getLogger(Login.class);
	@Resource
	UserService userService;
	@Resource
	MySQLMaxValueIncrementer increaseId;
	
	@RequestMapping("/loginpage")
	public String mainpage() {
		return "loginpage";
	}
	//用户注册
	@RequestMapping("/fslogin")
	public String login_fs(){
		return "login";
	}
	//页面登录
	@RequestMapping("/fsindex")
	public String index_fs(){
		return "index";
	}
	@RequestMapping("/success")
    public String success(HttpServletRequest request, HttpServletResponse response, HttpSession session){
	   String username = request.getParameter("username");
	   String password = request.getParameter("password_1");
	   String nickname = request.getParameter("nickname");
	   System.out.println("--测试页面:"+username+","+password+",昵称:"+nickname);
	   User user = new User();
	   user.setUsername(username);
	   user.setId(increaseId.nextStringValue());//自动生成主键
	   user.setPassword(MD5Util.string2MD5(password));
	   user.setNickname(nickname);
	   userService.insertUser(user);
	   
	   //创建session 保存新建的用户
//	   session.setAttribute(Constants.NICK_NAME,nickname);
		return "loginpage";
		
	}
	@RequestMapping(value="user_login")
	public String login(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String result = "";
		try {
			response.setCharacterEncoding("utf-8");
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			//获取session中保存的验证码
			logger.warn("username: " + username + ", password: " + password);
			
			Map<String, Object> paraMap = new HashMap<String, Object>();
			paraMap.put("username", username);
			paraMap.put("password", MD5Util.string2MD5(password));
			UsernamePasswordToken token = new UsernamePasswordToken(username, MD5Util.string2MD5(password));
			Subject subject = SecurityUtils.getSubject();
			try {
				subject.login(token);
//				session.setAttribute(Constants.USER_NAME, username);
				result = "loginpage";
			} catch (Exception e) {
				request.setAttribute("error", "用户名或者密码错误1！");
				result = "index";
//				session.setAttribute(Constants.USER_NAME, username);
//				result = "loginpage";
			}
		} catch (Exception e) {
			logger.warn("login方法异常：" + e.getMessage());
		}
		return result;
	}
	
	//页面loginpage的tbar登录状态判断
//	@ResponseBody
//	@RequestMapping(value="check_session")
//	public void checkSession(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
//		logger.warn("进入方法checkSession。。。。。。");
//		Object user = session.getAttribute(Constants.NICK_NAME);
//		if(user.equals("")) {
//			user = SessionUtil.getUserName(session);
//		}
//		String json = "0";
//		if(user != null) {
//			json = user.toString();
//		}
//		try {
//			logger.warn("用户昵称" + json);
//			response.setCharacterEncoding("utf-8");
//			PrintWriter out = response.getWriter();
//			out.write(json);
//			out.flush();
//			out.close();
//		} catch (Exception e) {
//			logger.warn("checkSession异常：" + e.getMessage());
//		}
//	}
	//页面退出删除session
	@ResponseBody
	@RequestMapping(value="remove_session")
	public String removeSession(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		logger.warn("进入方法removeSession。。。。。。");
		session.removeAttribute(Constants.USER_NAME);
		session.removeAttribute(Constants.NICK_NAME);
		Subject subject = SecurityUtils.getSubject();
		subject.logout();
		
		request.setAttribute("error", "用户名或者密码错误1！");
		String result = "index";
		return result;
	}
	
	/*@RequestMapping(value="remove_session")
	public String removeSession() {
		logger.warn("进入方法removeSession。。。。。。");
//		session.removeAttribute(Constants.USER_NAME);
//		session.removeAttribute(Constants.NICK_NAME);
		Subject subject = SecurityUtils.getSubject();
		subject.logout();
		
		String result = "index";
		return result;
	}*/
}


















