package com.esy.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.esy.entity.TreeNode;
import com.esy.service.NodeService;
import com.esy.utils.IDUtil;

@RequestMapping("/systemconfig")
@Controller
@Scope("prototype")
public class SystemConfig {
	private static Logger logger = Logger.getLogger(SystemConfig.class);
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
			String pid = request.getParameter("id");
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
	@RequestMapping("/menuconfig")
	public String toMenuConfig() {
			return "menuconfig";
	}
	//菜单设置管理
	@RequestMapping(value = "/menudetail", method = RequestMethod.POST)
	@SuppressWarnings("rawtypes")
	public void menudetail(HttpServletRequest request,  HttpServletResponse response) {
		logger.warn("*****************menudetail*************");
		try {
			response.setCharacterEncoding("utf-8");
			PrintWriter out = response.getWriter();
			String start = request.getParameter("start");
			String limit = request.getParameter("limit");
			String ename = request.getParameter("ename");
			String id = request.getParameter("id");
			String pid = request.getParameter("pid");
			int index = Integer.parseInt(start);
			int pageSize = Integer.parseInt(limit);
			Map<String, Object> paras = new HashMap<String, Object>();
			paras.put("start", index);
			paras.put("limit", pageSize);
			paras.put("ename", ename);
			paras.put("id", id);
			paras.put("pid", pid);
			int total = nodeService.queryCount(paras);
			List<Map> stocks = nodeService.findnode(paras);
			String jsons = "{\"total\":" + total + ", \"root\":" + JSONArray.fromObject(stocks) + "}";
			out.write(jsons);
			logger.warn("jsons: " + jsons);
			out.flush();
			out.close();
		} catch (Exception e) {
			logger.warn("recomsHander方法异常：" + e.getMessage());
		}
	}
	
	/**
	 * 菜单配置页面增加记录
	 */
	@ResponseBody
	@RequestMapping(value="addNode", method=RequestMethod.POST)
	public void addNode(HttpServletRequest request, HttpServletResponse response) {
		String[] jsonArray = request.getParameterValues("param");
		PrintWriter out = null;
		String info = "{\"success\":true}";
		try {
		for(int i = 0; i < jsonArray.length; i++) {
			logger.warn("jsonArray: " + jsonArray[i]);
			TreeNode node = (TreeNode)JSONObject.toBean(JSONObject.fromObject(jsonArray[i]), TreeNode.class);
			if(node.getId() != null && !node.getId().equals("")) {
				nodeService.updateNode(node);
			} else {
				node.setId(IDUtil.getIdstr("node"));
				logger.warn(node.toString());
				nodeService.insertNode(node);
			}
		}
		logger.warn("节点保存成功");
		response.setCharacterEncoding("utf-8");
		
			out = response.getWriter();
			
		} catch (IOException e) {
			info = "{\"success\":false, \"msg\":"+ e.getMessage() + "}";
			logger.warn(info);
		}
		out.print(info);
		out.flush();
		out.close();
		
		//this.menudetail(request, response);
	}
	/**
	 * 菜单配置页面增加记录
	 */
	@ResponseBody
	@RequestMapping(value="updateNode", method=RequestMethod.POST)
	public void updateNode(HttpServletRequest request, HttpServletResponse response) {
		String[] jsonArray = request.getParameterValues("param");
		PrintWriter out = null;
		String info = "";
		try {
			for(int i = 0; i < jsonArray.length; i++) {
				logger.warn("jsonArray: " + jsonArray[i]);
				TreeNode node = (TreeNode)JSONObject.toBean(JSONObject.fromObject(jsonArray[i]), TreeNode.class);
				logger.warn(node.toString());
				nodeService.updateNode(node);
			}
			logger.warn("节点更新成功");
			response.setCharacterEncoding("utf-8");
			
			out = response.getWriter();
			
		} catch (IOException e) {
			info = e.getMessage();
			logger.warn(info);
		}
		out.print(info);
		out.flush();
		out.close();
		this.menudetail(request, response);
	}
	/**
	 * 菜单配置页面更新记录
	 */
	@ResponseBody
	@RequestMapping(value="deleteNode", method=RequestMethod.POST)
	public void deleteNode(HttpServletRequest request, HttpServletResponse response) {
		String[] jsonArray = request.getParameterValues("param");
		PrintWriter out = null;
		String info = "";
		try {
			for(int i = 0; i < jsonArray.length; i++) {
				logger.warn("jsonArray: " + jsonArray[i]);
				TreeNode node = (TreeNode)JSONObject.toBean(JSONObject.fromObject(jsonArray[i]), TreeNode.class);
				logger.warn(node.toString());
				nodeService.deleteNode(node);
			}
			logger.warn("节点删除成功");
			response.setCharacterEncoding("utf-8");
			
			out = response.getWriter();
			
		} catch (IOException e) {
			info = e.getMessage();
			logger.warn(info);
		}
		out.print(info);
		out.flush();
		out.close();
		this.menudetail(request, response);
	}
	
}
