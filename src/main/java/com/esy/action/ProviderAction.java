package com.esy.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.esy.entity.Provider;
import com.esy.entity.TreeNode;
import com.esy.service.ProviderService;
import com.esy.utils.DateUtil;
import com.esy.utils.IDUtil;
import com.esy.utils.SessionUtil;

@Controller
@RequestMapping("/provider")
public class ProviderAction {
	
	private static Logger logger = Logger.getLogger(ProviderAction.class);
	@Resource
	ProviderService providerService;
	
	
	@RequestMapping("/toprovider")
	public String toProviderConfig() {
		return "providerconfig";
	}
	
	@RequestMapping("/query")
	@ResponseBody
	public void query(HttpServletRequest request, HttpServletResponse response) {
		logger.warn("****************query*************");
		try {
			response.setCharacterEncoding("utf-8");
			PrintWriter out = response.getWriter();
			String start = request.getParameter("start");
			String limit = request.getParameter("limit");
			String providerCode = request.getParameter("providerCode");
			String providerName = request.getParameter("providerName");
			String providerAddress = request.getParameter("providerAddress");
			int index = Integer.parseInt(start);
			int pageSize = Integer.parseInt(limit);
			Map<String, Object> paras = new HashMap<String, Object>();
			paras.put("start", index);
			paras.put("limit", pageSize);
			paras.put("providerCode", providerCode);
			paras.put("providerName", providerName);
			paras.put("providerAddress", providerAddress);
			int total = providerService.selectcount(paras);
			List<Provider> providers = providerService.select(paras);
			String jsons = "{\"total\":" + total + ", \"root\":" + JSONArray.fromObject(providers) + "}";
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
	@RequestMapping(value="addprovider", method=RequestMethod.POST)
	public void addNode(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String[] jsonArray = request.getParameterValues("param");
		PrintWriter out = null;
		String info = "{\"success\":true}";
		try {
			for(int i = 0; i < jsonArray.length; i++) {
				logger.warn("jsonArray: " + jsonArray[i]);
				Provider provider = (Provider)JSONObject.toBean(JSONObject.fromObject(jsonArray[i]), Provider.class);
				if(provider.getId() != null && !provider.getId().equals("")) {
					provider.setUpdateName(SessionUtil.getNickName(session));
					provider.setUpdateCode(SessionUtil.getUserName(session));
					provider.setUpdateTime(DateUtil.curDatestr14());
					providerService.updateByPrimaryKey(provider);
					
				} else {
					provider.setId(IDUtil.getIdstr("provider"));
					provider.setCreateName(SessionUtil.getNickName(session));
					provider.setCreateCode(SessionUtil.getUserName(session));
					provider.setCreateTime(DateUtil.curDatestr14());
					providerService.insert(provider);
				}
			}
			logger.warn("供应商保存成功");
			response.setCharacterEncoding("utf-8");
			out = response.getWriter();
		} catch (IOException e) {
			info = "{\"success\":false, \"msg\":"+ e.getMessage() + "}";
			logger.warn(info);
		}
		out.print(info);
		out.flush();
		out.close();
	}
	
	@ResponseBody
	@RequestMapping(value="deleteprovider", method=RequestMethod.POST)
	public void deleteNode(HttpServletRequest request, HttpServletResponse response) {
		String[] jsonArray = request.getParameterValues("param");
		PrintWriter out = null;
		String info = "";
		try {
			for(int i = 0; i < jsonArray.length; i++) {
				logger.warn("jsonArray: " + jsonArray[i]);
				Provider provider = (Provider)JSONObject.toBean(JSONObject.fromObject(jsonArray[i]), Provider.class);
				providerService.deleteByPrimaryKey(provider.getId());
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
	}
	/**
	 * 供应商下拉框代码providerCode和providerName
	 * @param request
	 * @param response
	 */
	@ResponseBody
	@RequestMapping(value="queryComBo")
	public void queryComBo(HttpServletRequest request, HttpServletResponse response) {
		PrintWriter out = null;
		String json = "{\"images\":";
		try {
			List<Map<String, Object>> results = providerService.queryComBo();
			if(results != null && !results.isEmpty()) {
				json += JSONArray.fromObject(results).toString();
			}
			json += "}";
			logger.warn("供应商代码：:" + json);
			out = response.getWriter();
			out.write(json);
		} catch (Exception e) {
			logger.warn("获取供应商代码异常" + e.getMessage());
		} finally {
			out.flush();
			out.close();
		}
	}
	
	
}
