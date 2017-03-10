<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
 <%String path = request.getContextPath(); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>合同管理配置页面</title>
	<link rel="stylesheet" type="text/css" href="<%=path%>/ext-3.2.0/resources/css/ext-all.css" />
	<script type="text/javascript" src="<%=path%>/ext-3.2.0/adapter/ext/ext-base-debug.js"></script>
	<script type="text/javascript" src="<%=path%>/ext-3.2.0/ext-all-debug.js"></script>
	<script type="text/javascript" src="<%=path%>/ext-3.2.0/src/locale/ext-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=path%>/js/subunit.js"></script>
	<script type="text/javascript" src="<%=path%>/js/common.js"></script>
	<script type="text/javascript" src="<%=path%>/ext-3.2.0/examples.js"></script>
	<link rel="stylesheet" type="text/css" href="<%=path%>/ext-3.2.0/examples.css" />
	<script type="text/javascript">
	//文件上传并非异步操作，返回的json会出现问题，需要加上这段js
	Ext.USE_NATIVE_JSON = true;
	window.JSON = {
		"stringify":Ext.util.JSON.doEncode,
		"parse":function(json){
			var str = json;
			var spos = str.indexOf(">");
			var epos = 0;
			if(spos != -1){
				 epos = str.indexOf("<",spos);
				
				str = str.substr(spos+1,epos-spos-1); 
			}
			return eval("("+str+")");
		},
		"toString":function(){
			return '[object JSON]';
		}
	};
	</script>
</head>
<body>
</body>
</html>