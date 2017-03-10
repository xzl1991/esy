package com.esy.entity;

public class SkuMap 
{
	private int id;
	private int productid;
	private int specid;
	private int skuid;
	private int amount;
	private int lock;
	private int uselock;
	
	public int getUselock() {
		return uselock;
	}
	public void setUselock(int uselock) {
		this.uselock = uselock;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getProductid() {
		return productid;
	}
	public void setProductid(int productid) {
		this.productid = productid;
	}
	public int getSpecid() {
		return specid;
	}
	public void setSpecid(int specid) {
		this.specid = specid;
	}
	public int getSkuid() {
		return skuid;
	}
	public void setSkuid(int skuid) {
		this.skuid = skuid;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public int getLock() {
		return lock;
	}
	public void setLock(int lock) {
		this.lock = lock;
	}
}
