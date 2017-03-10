<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
 <%String path = request.getContextPath(); %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>注册页</title>
<link rel="stylesheet" href="<%=path%>/twitter-signup.css" type="text/css">
		<link rel="stylesheet" href="<%=path%>/main.css" type="text/css">
		<script charset="utf-8" src="<%=path%>/js/jquery-1.4.js"></script>
<script type="text/javascript">
		function vilidatePassW(oldpassword) {
			if(oldpassword == '' || oldpassword == null) {
				alert("密码不能为空！！");
				$("#password_1 :input").focus();
				return ;
			}
			var password1 = $("#password_1 :input").val();
			if(password1 != oldpassword) {
				alert("两次输入的密码不同！！"); 
				$("#password_1 :input").val('');
				$("#password_2 :input").val('');
				$("#password_1 :input").focus();
			}
		}
		
		function validateUserN(username) {
			if(username == '' || username == null) {
				alert("用户名不能为空！！");
				return ;
			}
			$.ajax({
				type: "POST",
				url : "vilidate",
				data : {username : username},
				success : function(msg) {
					var success = "success";
					if(msg != success){
						alert("用户名已经被注册！");
						$("#username :input").select();
						
					}

				}
			});
		}
		
		function beforesubmit() {
			var username = $("#username :input").val();
			var password = $("#password_1 :input").val();
			if(username == '' || username == null) {
				alert("用户名不能为空！");
				return false;
			} else if(password == '' || password == null) {
				alert("密码不能为空！");
				$("#password_1 :input").focus();
				return false;
			}
			
			return true;
		}
</script>
</head>
<body>
		<div id="container">
			<br><br><br>
			<div class="label">注册信息</div>
			<br><br>
			<div id="twitter-outer">
				<div id="twitter-logo">
					<img src="<%=path %>/images/logo.gif" alt="guanjie之牛刀小试" height="36" width="155"> 
					<div class="content-bubble-arrow"></div>
				</div>
				
				<div id="twitter">
			<form action="success" method="post" onsubmit="return beforesubmit()"> 
						<div id='username' class='outerDiv'>
							<label for="text">用户名:</label> 
							<input type="text" name="username" onblur="validateUserN(this.value)" /> <span id="usernameinfo"></span>
							<div class='message' id='nameDiv'> <span style="color:#FF0000">*必填</span> </div>
							
						</div>
						<div class='clearfix'></div>
						<div id='password_1' class='outerDiv'>
							<label for="password">新密码:</label> 
							<input type="password" name="password_1"   /> 
							<div class='message' id='usernameDiv'> <span style="color:#FF0000">*必填</span> </div>
						</div>
						<div class='clearfix'></div>

						<div id='password_2' class='outerDiv'>
							<label for="password">重复密码:</label> 
							<input type="password" name="password_2" onblur="vilidatePassW(this.value)" /> 
							<div class='message' id='websiteDiv'> <span style="color:#FF0000">*必填</span> </div>
						</div>
						<div class='clearfix'></div>
						<div id='nickname' class='outerDiv'>
							<label for="text">昵称:</label> 
							<input type="text" name="nickname"  /> 
							<div class='message' id='websiteDiv'> <span style="color:#FF0000">*必填</span> </div>

						</div>
						<div class='clearfix'></div>
						<div id='submit' class='outerDiv'>
							<input type="submit" value="Create my account" /> 
						</div>
						<div class='clearfix'></div>
					</form>
					<div class="clearfix"></div>
				</div>
			</div>	
		<br>
			
		</div>
</body>
</html>