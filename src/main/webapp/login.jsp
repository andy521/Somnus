<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String contextPath = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<title>系统登录</title>
<jsp:include page="inc.jsp"></jsp:include>
<script type="text/javascript" src="<%=contextPath%>/jslib/login.js"></script>
</head>
<body>
	<strong>SSHE示例系统默认账户：</strong>
	<br />
	<br />
	<table class="table">
		<tr>
			<th>登录名/密码</th>
			<th>账户描述</th>
		</tr>
		<tr>
			<td>admin/123456</td>
			<td>超管，拥有系统所有权限</td>
		</tr>
		<tr>
			<td>guest/123456</td>
			<td>来宾用户，拥有查看权限</td>
		</tr>
		<tr>
			<td>admin1/123456</td>
			<td>资源管理员</td>
		</tr>
		<tr>
			<td>admin2/123456</td>
			<td>角色管理员</td>
		</tr>
		<tr>
			<td>admin3/123456</td>
			<td>机构管理员</td>
		</tr>
		<tr>
			<td>admin4/123456</td>
			<td>用户管理员</td>
		</tr>
		<tr>
			<td>admin5/123456</td>
			<td>系统监控管理员</td>
		</tr>
	</table>
	<br />
	<strong>如果登录不了，或者数据错乱、丢失等情况，请点击下面链接</strong>
	<br />
	<a href="<%=contextPath%>/init.jsp">初始化数据库(<%=contextPath%>/init.jsp)</a>
</body>
</html>