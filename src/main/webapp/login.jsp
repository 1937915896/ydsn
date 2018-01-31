<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>实验室物料管理系统-登录</title>
<link rel="stylesheet" href="static/css/init.css">
<link rel="stylesheet" href="static/css/style.css">
<script type="text/javascript" src="static/js/check.js"></script>
</head>
<body>
	<form name="f" id="login" method="POST"
		action="j_spring_security_check">
		<div class="loginTab">
			<img src="static/img/syslogo.png" alt="syslogo">
			<h1>实验室物料管理系统</h1>
			<div>
				<span>用户名：</span> <input id="account" type="text" name="j_username"
					placeholder="请输入用户名">
			</div>
			<div>
				<span>密&nbsp;&nbsp;&nbsp;码：</span> <input id="password" type="password"
					name="j_password" placeholder="请输入密码">
			</div>
			<div>
				<%
							String error = request.getParameter("error");
							if ("1".equals(error)) {
								out.println("<span style=\"width: 150px; color: #aa0000;display:block;margin:0 auto;\">帐号或者密码错误</span>");
							}
				%>
			</div>
			<div style="">
				<input id="submit" type="submit" name="submit" value="登录"
					class="btn btn-primary" style="display:block;margin:15px auto;"/>
						
			</div>
		</div>
	</form>
</body>
</html>
