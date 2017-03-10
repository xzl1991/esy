package com.esy.action;

import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.junit.Test;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.esy.service.NodeService;

@Controller
@RequestMapping("/test")
public class TestAll {
	@Resource
	NodeService nodeService;
	@RequestMapping("/AllTest")
	public String test01(HttpSession session) {
		Session session2 = SecurityUtils.getSubject().getSession();
		session2.setAttribute("name", "guanjei");
		System.out.println(session.getAttribute("name") + "sesion共同");
		
		return "AllTest";
	}
	@RequestMapping(value = "/tree", method = RequestMethod.POST)
	@ResponseBody
	public void test02(HttpServletRequest request, HttpServletResponse response) {
		response.setCharacterEncoding("utf-8");
		Object node = request.getParameter("id");
		System.out.println(node);
		@SuppressWarnings("rawtypes")
		List<Map> nodes = new ArrayList<Map>();
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("pid", 1);
			nodes = nodeService.findnode(map);
			PrintWriter out = response.getWriter();
			out.print(JSONArray.fromObject(nodes));
			out.flush();
			out.close();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
	}
	
	
	@RequestMapping("/mainpage")
	public String mainpage() {
		return "mainpage";
	}
	@Test
	public void test0001() {
	}
	@Test
	public void test0002() {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String da = df.format(new Date());
		System.out.println(da);
	}
	@Test
	public void test0003() {
		String a = "abcdefg";
		System.out.println(a.substring(1,3));
		String s = UUID.randomUUID().toString();
		System.out.println(UUID.nameUUIDFromBytes("bb".getBytes()).toString());
		System.out.println(s);
	}
	@Test
	public void test0004() {
		
		String s = "/abaa";
		System.out.println(s.indexOf("aa"));
	}
	@Test
	public void test0005() {
//		DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		System.out.println(System.currentTimeMillis());
	}
}
