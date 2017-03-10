<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%String path = request.getContextPath(); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>系统登录</title>

<!--- CSS --->
<link rel="stylesheet" href="<%=path %>/style.css" type="text/css" />
<script charset="utf-8" src="<%=path%>/js/jquery-1.4.js"></script>


<!--- Javascript libraries (jQuery and Selectivizr) used for the custom checkbox --->

<!--[if (gte IE 6)&(lte IE 8)]>
		<script type="text/javascript" src="jquery-1.7.1.min.js"></script>
		<script type="text/javascript" src="selectivizr.js"></script>
		<noscript><link rel="stylesheet" href="fallback.css" /></noscript>
	<![endif]-->
<script type="text/javascript">
	function vilidate() {
		var username = $("#username").val();
		var password = $("#password").val();
		if((username != '' && username != null) && (password != '' && password != null)) {
			return true;
		} else {
			return false;
		}
			
	}
</script>
</head>

<body>
	<div id="container">
		<div id="error" align="center"><font color="red">${error}</font></div>
		<form action="<%=path %>/login/user_login" method="post" onsubmit="return vilidate()">
			<div class="login">登录</div>
			<div class="username-text">用户名:</div>
			<div class="password-text">密   码:</div>
			<div class="username-field">
				<input id="username" type="text" name="username" value="" />
			</div>
			<div class="password-field">
				<input id="password" type="password" name="password" value=""/>
			</div>
			<input type="checkbox"  name="remember-me" id="remember-me" />
			<label for="remember-me">Remember me</label>
			<div class="forgot-usr-pwd">
				 <a href="<%=path %>/loginAction/loginPage">忘记密码 </a>  
			</div>
			<input type="submit" name="submit" value="GO" />
		</form>
	</div>
	<div id="footer">
		Copyright &copy; 2016.<a target="_blank"
			href="http://www.cnblogs.com/homeOfJain">捷思源之牛刀小试</a>
	</div>
</body>
</html>