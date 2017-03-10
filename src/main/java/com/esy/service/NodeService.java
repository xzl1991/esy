package com.esy.service;

import java.util.List;
import java.util.Map;

import com.esy.entity.TreeNode;

@SuppressWarnings("rawtypes")
public interface NodeService {
	
	public List<Map> findnode(Map map);
	
	public int queryCount(Map map);
	
	public void insertNode(TreeNode node);
	public void updateNode(TreeNode node);
	
	public void deleteNode(TreeNode node);
}
