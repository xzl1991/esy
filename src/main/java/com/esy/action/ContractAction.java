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

import com.esy.entity.Contract;
import com.esy.entity.Provider;
import com.esy.service.ContractService;
import com.esy.utils.DateUtil;
import com.esy.utils.IDUtil;
import com.esy.utils.SessionUtil;

@Controller
@RequestMapping("/contract")
public class ContractAction {

	private static Logger logger = Logger.getLogger(ContractAction.class);
	@Resource
	ContractService contractService;
	
	@RequestMapping("/tocontract")
	public String toProviderConfig() {
		return "contractconfig";
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
//			String providerCode = request.getParameter("providerCode");
//			String providerName = request.getParameter("providerName");
//			String providerAddress = request.getParameter("providerAddress");
			int index = Integer.parseInt(start);
			int pageSize = Integer.parseInt(limit);
			Map<String, Object> paras = new HashMap<String, Object>();
			paras.put("start", index);
			paras.put("limit", pageSize);
//			paras.put("providerCode", providerCode);
//			paras.put("providerName", providerName);
//			paras.put("providerAddress", providerAddress);
			int total = contractService.selectcount(paras);
			List<Contract> contracts = contractService.select(paras);
			String jsons = "{\"total\":" + total + ", \"root\":" + JSONArray.fromObject(contracts) + "}";
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
	@RequestMapping(value="addcontract", method=RequestMethod.POST)
	public void addContract(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		
		PrintWriter out = null;
		String info = "{\"success\":true}";
		try {
			out = response.getWriter();
			String params = request.getParameter("param");
			logger.warn("params: " + params);
			Contract contract = (Contract)JSONObject.toBean(JSONObject.fromObject(params), Contract.class);
			String conId = contract.getId();
			if(conId != null && !conId.equals("")) {
				contractService.updateByPrimaryKey(contract);
			} else {
				contract.setId(IDUtil.getIdstr("contra"));
				contractService.insert(contract);
			}
		} catch (Exception e) {
			logger.warn(e.getMessage());
			info = "{\"success\":false, \"msg\":\"数据存储异常\"}";
		}
		
		
		
	/*	try {
			for(int i = 0; i < jsonArray.length; i++) {
				logger.warn("jsonArray: " + jsonArray[i]);
				Contract contract = (Contract)JSONObject.toBean(JSONObject.fromObject(jsonArray[i]), Contract.class);
				if(contract.getId() != null && !contract.getId().equals("")) {
					contractService.updateByPrimaryKey(contract);
					
				} else {
					contract.setId(IDUtil.getIdstr("contract"));
//					provider.setCreateName(SessionUtil.getNickName(session));
//					provider.setCreateCode(SessionUtil.getUserName(session));
//					provider.setCreateTime(DateUtil.curDatestr14());
					contractService.insert(contract);
				}
			}
			logger.warn("合同保存成功");
			response.setCharacterEncoding("utf-8");
			out = response.getWriter();
		} catch (IOException e) {
			info = "{\"success\":false, \"msg\":"+ e.getMessage() + "}";
			logger.warn(info);
		}*/
		out.print(info);
		out.flush();
		out.close();
	}
	
	@ResponseBody
	@RequestMapping(value="deletecontract", method=RequestMethod.POST)
	public void deleteNode(HttpServletRequest request, HttpServletResponse response) {
		String[] jsonArray = request.getParameterValues("param");
		PrintWriter out = null;
		String info = "";
		try {
			for(int i = 0; i < jsonArray.length; i++) {
				logger.warn("jsonArray: " + jsonArray[i]);
				Contract contract = (Contract)JSONObject.toBean(JSONObject.fromObject(jsonArray[i]), Contract.class);
				contractService.deleteByPrimaryKey(contract.getId());
			}
			logger.warn("合同删除成功");
			out = response.getWriter();
		} catch (IOException e) {
			info = e.getMessage();
			logger.warn(info);
		}
		out.print(info);
		out.flush();
		out.close();
	}
}

