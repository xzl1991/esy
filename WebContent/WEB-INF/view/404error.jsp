<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
 <%String path = request.getContextPath(); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script charset="utf-8" src="<%=path%>/js/jquery-1.4.1.min.js"></script>
<title>访问异常</title>

<style type=text/css>
#main{
	width:500px;
	height:500px;
	position:absolute;
	left:50%;
	margin-left:-250px;
	background-image:url(<%=path%>/images/x.gif);
	background-repeat:no-repeat;
	}
#main_bottom {
	width:300px;
	height:40px;
	position:relative;
	margin-top:335px;
	left:50%;
	margin-left:-105px;
	line-height:25px;
	}
</style>
<script type="text/javascript">
</script>
</head>
	
<body>
	<div id="main">
	  <div id="main_bottom">
	  	<strong>您访问的页面</strong><font color=#0099ff>不存在</font>或被<font color=#ff0000>删除！<br/></font>
	  	<br>
	  </div>
	</div>
</body>
</html>
