package com.esy.service;

import java.util.List;

import com.esy.entity.Sku;
import com.esy.entity.SkuMap;
@SuppressWarnings("rawtypes")
public interface SkuService {
	public void dealTest();
	public List<Sku> findSku();
	public Sku findSkuById(int skuId);
	public List<SkuMap> findSkuMap(int skuId);
	public Sku findSkuByErp(Sku sku);
	
	public void updateSku(Sku sku); 
	public void updateSkuMapBatch(List<SkuMap> skuMapList); 
	public void updateSkuMap(SkuMap skuMap);
//	JsonrpcResponse getExpressByOrderId(Sku sku, List<SkuMap> skuMap);
	
	
	
}
