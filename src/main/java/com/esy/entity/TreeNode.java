package com.esy.entity;

public class TreeNode {
	
	private String id;
	/**树节点的名称*/
	private String text;
	private String ename;
	private String leaf;
	private String url;
	private String pid;
	private String pcname;
	private String pename;

	
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getEname() {
		return ename;
	}
	public void setEname(String ename) {
		this.ename = ename;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getLeaf() {
		return leaf;
	}
	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}
	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	public String getPcname() {
		return pcname;
	}
	public void setPcname(String pcname) {
		this.pcname = pcname;
	}
	public String getPename() {
		return pename;
	}
	public void setPename(String pename) {
		this.pename = pename;
	}
	@Override
	public String toString() {
		return "TreeNode [id=" + id + ", text=" + text + ", ename=" + ename
				+ ", leaf=" + leaf + ", url=" + url + ", pid=" + pid
				+ ", pcname=" + pcname + ", pename=" + pename + "]";
	}
	
	
}
