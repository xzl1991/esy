package com.esy.action;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.annotations.Param;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.esy.entity.Sku;
import com.esy.entity.SkuMap;
import com.esy.service.SkuService;


@Controller
public class AskApp1 {
	/**
	 * 根据关键词获取相关标签
	 * 
	 * @param keyword
	 *            关键词
	 * @param top
	 *            条数
	 * 
	 * @return xml格式
	 * @throws Exception\
	 * private static Logger logger = Logger.getLogger(ContractAction.class);
	 */
	private static Logger logger = Logger.getLogger("skuSynclog");
	@Resource
	SkuService skuService;
	@RequestMapping(value="/getTest")
	public  void getTagsByKeyWords(@Param("id")int id,@Param("state")int state,
			HttpServletResponse response) throws Exception {
		long start = System.currentTimeMillis();
		List<Sku> skuList =  skuService.findSku();
		logger.info("访问erp接口...业务处理");
//		List<Askdetail> detaiList =  askList.get(0).getAskDetails();//空
		int size = skuList.size();
		Sku sku = null;
		for(int i=0;i<size;i++){
			sku = skuList.get(i);
			System.out.println(sku.getLocks()+","+sku.getQuantity()+","+sku.getSkuid());
		}
		boolean added = true;
		// 返回结果信息
		ServletOutputStream out = response.getOutputStream();
		out.close();
		System.out.println("总时间:"+(System.currentTimeMillis()-start));
	}
	@RequestMapping(value="/upSku")
	public @ResponseBody String updateSku(){
		logger.info("记录更新...");
		logger.error("这里发生了错误！！！");
		int skuId = 4121;
		Sku sku = skuService.findSkuById(skuId);
		try {
			System.out.println("异常前。。。");
			skuService.dealTest();
			test();
			System.out.println("异常后。。。");
		} catch (Exception e) {
			// TODO: handle exception
			return "sssss";
		}
		sku.setQuantity(100);
		sku.setStoreName("乾坤袋");
		skuService.updateSku(sku);
		List<SkuMap> skuMapList = sku.getSkuMapList();
		System.out.println(skuMapList==null?0:skuMapList.size());
		int size = skuMapList.size();
		SkuMap smap = null;
		for(int i=0;i<size;i++){
			smap = skuMapList.get(i);
			smap.setLock(66);
			System.out.println(smap.getLock()+","+smap.getSkuid());
		}
		skuService.updateSkuMapBatch(skuMapList);
		logger.info("记录结束...");
		return "sss";
	}
	public void test(){
		throw new RuntimeException("我跑出个异常~~~");
	}
	@RequestMapping(value="/getSku")
	public  void getSku(int id,
			HttpServletResponse response) throws Exception {
		long start = System.currentTimeMillis();
		logger.info("访问erp接口...业务处理");
		id = 0;
//		List<Askdetail> detaiList =  askList.get(0).getAskDetails();//空
//		List<Sku> skuList =  skuService.findSku();
		Sku sku = skuService.findSkuById(id);
		List<SkuMap> skuMaps = sku.getSkuMapList();
		
		
		boolean added = true;
		// 返回结果信息
		ServletOutputStream out = response.getOutputStream();
		out.close();
		System.out.println("总时间:"+(System.currentTimeMillis()-start));
	}
	/**
	 * 得到对象中的方法并使用map缓存
	 */
	public static Map<String, Object> getMethods(Object o) throws Exception{
		Map<String, Object> methodsmap = new HashMap<String, Object>();
		Method[] methods = o.getClass().getMethods();
		for(Method m : methods){
			methodsmap.put(m.getName(), m);
		}
		return methodsmap;
	}
	/**
	 * 字符串首字母改为大写
	 */
	public static String capturename(String name) {
		char[] cs = name.toLowerCase().toCharArray();
		if(!(cs[0]>='A'&&cs[0]<='Z')){
			cs[0] -= 32;
		}
		return String.valueOf(cs);
	}
	public static void gzipHtml(HttpServletResponse response,
			HttpServletRequest request, String content,String messagename) throws IOException {

		byte[] data = content.getBytes("GBK");

		ServletOutputStream os = response.getOutputStream();
		os.write(data);
		os.close();
	}
	
}
