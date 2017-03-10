package com.esy.entity;

import java.util.List;


public class Sku 
{
	private int skuid;
	private int quantity;
	private int usequantity;
	//新加的字段
	private int locks; //skumap lock
	private int uselock;// skumap 的已用lock
	private String storeCode;//仓库编码
	private String secondAttribute;//第二属性
	private String secondAttriValue;//第二属性值
	private String storeName;//仓库名称
	private int state;//是否可用 -1:未知 0:不可用，1:可用
	private String erpId;//物料id 
	private List<SkuMap> skuMapList;
	private SkuMap skuMap;
	public String getStoreCode() {
		return storeCode;
	}
	public void setStoreCode(String storeCode) {
		this.storeCode = storeCode;
	}
	public SkuMap getSkuMap() {
		return skuMap;
	}
	public void setSkuMap(SkuMap skuMap) {
		this.skuMap = skuMap;
	}
	public String getSecondAttribute() {
		return secondAttribute;
	}
	public void setSecondAttribute(String secondAttribute) {
		this.secondAttribute = secondAttribute;
	}
	public String getSecondAttriValue() {
		return secondAttriValue;
	}
	public void setSecondAttriValue(String secondAttriValue) {
		this.secondAttriValue = secondAttriValue;
	}
	public List<SkuMap> getSkuMapList() {
		return skuMapList;
	}
	public void setSkuMapList(List<SkuMap> skuMapList) {
		this.skuMapList = skuMapList;
	}
	public String getStoreName() {
		return storeName;
	}
	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}
	public String getErpId() {
		return erpId;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public void setErpId(String erpId) {
		this.erpId = erpId;
	}
	public int getLocks() {
		return locks;
	}
	public void setLocks(int locks) {
		this.locks = locks;
	}
	public int getUselock() {
		return uselock;
	}
	public void setUselock(int uselock) {
		this.uselock = uselock;
	}
	public int getUsequantity() {
		return usequantity;
	}
	public void setUsequantity(int usequantity) {
		this.usequantity = usequantity;
	}
	public int getSkuid() {
		return skuid;
	}
	public void setSkuid(int skuid) {
		this.skuid = skuid;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}
