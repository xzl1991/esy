package com.esy.action;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.esy.entity.User;
import com.esy.service.NodeService;
import com.esy.service.UserService;
import com.esy.utils.DateUtil;
import com.esy.utils.IDUtil;
import com.esy.utils.MD5Util;

@RequestMapping("/userconfig")
@Controller
@Scope("prototype")
public class UserConfig {
	private static Logger logger = Logger.getLogger(UserConfig.class);
	@Resource
	UserService userService;
	@Resource
	NodeService nodeService;
	/**
	 * 加载导航
	 * */
	@RequestMapping(value = "/tree")
	@ResponseBody
	@SuppressWarnings("rawtypes")
	public void navigation(HttpServletRequest request, HttpServletResponse response) {
		logger.warn("加载导航。。。。。。。。。。。。。。。。。。");
		response.setCharacterEncoding("utf-8");
		List<Map> nodes = new ArrayList<Map>();
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			String id = request.getParameter("id");
			int pid = Integer.parseInt(id);
			map.put("pid", pid);
			nodes = nodeService.findnode(map);
			PrintWriter out = response.getWriter();
			out.print(JSONArray.fromObject(nodes));
			out.flush();
			out.close();
		} catch (Exception e) {
			logger.warn(e.getMessage());
		}
	}
	//跳转到菜单设置页面
	@RequestMapping("/userconfig")
	public String toUserConfig() {
			return "userconfig";
	}
	
	@ResponseBody
	@RequestMapping(value="in_user")
	public void inUser(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String restr = "{\"success\":true}";
		try {
			response.setCharacterEncoding("utf-8");
			String username = request.getParameter("username");
			String nickname = request.getParameter("nickname");
			Map<String, Object> paramap = new HashMap<String, Object>();
			paramap.put("username", username);
			List<User> users = userService.finduser(paramap);
			if(users.size() != 0) {
				restr = "{\"success\" : true, \"info\": 1}";
			} else {
				String password = request.getParameter("password");
				//获取session中保存的验证码
				logger.warn("username: " + username + ", password: " + password);
				
				User user = new User();
				user.setUsername(username);
				user.setNickname(nickname);
				user.setPassword(MD5Util.string2MD5(password));
				user.setCreateTime(DateUtil.curDatestr14());
				user.setId(IDUtil.getIdstr("u"));
				userService.insertUser(user);
			}
			PrintWriter out = response.getWriter();
			out.write(restr);
			out.flush();
			out.close();
		} catch (Exception e) {
			logger.warn("login方法异常：" + e.getMessage());
		}
	}
		//用户设置管理
		@RequestMapping(value = "/userdetail", method = RequestMethod.POST)
	public void userdetail(HttpServletRequest request, @RequestBody String jsons, HttpServletResponse response) {
			logger.warn("userdetail");
			try {
				response.setCharacterEncoding("utf-8");
				PrintWriter out = response.getWriter();
				String start = request.getParameter("start");
				String limit = request.getParameter("limit");
				String searchText = request.getParameter("searchText");
				int index = Integer.parseInt(start);
				int pageSize = Integer.parseInt(limit);
				Map<String, Object> paras = new HashMap<String, Object>();
				paras.put("start", index);
				paras.put("limit", pageSize);
				paras.put("username", searchText);
				int total = userService.querycount(paras);
				List<User> users = userService.finduser(paras);
				jsons = "{\"total\":" + total + ", \"root\":" + JSONArray.fromObject(users) + "}";
				out.write(jsons);
				logger.warn("jsons: " + jsons);
				out.flush();
				out.close();
			} catch (Exception e) {
				logger.warn("recomsHander方法异常：" + e.getMessage());
			}
		}
	
}
