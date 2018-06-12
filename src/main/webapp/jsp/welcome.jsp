<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String contextPath = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<title>欢迎页面</title>
<jsp:include page="inc.jsp"></jsp:include>
</head>
<body style="padding:10px;background:url('../style/images/bg.jpg') no-repeat !important;" >
	Somnus示例项目是一个由Struts2.3.x+Spring3.2.x+Hibernate4.2.x+CXF2.7.x+ExtJs4.2+Maven架构的示例项目
	<br/><br/>系统可作为OA、网站、电子政务、ERP、CRM、APP后台等基于B/S架构的应用软件系统的快速开发框架
	<br/><br/> 当前示例演示了包括：权限控制、超大附件文件上传、ExtJs4基本组件使用等等功能，具体请自行看本示例演示功能
	<br/><br/>框架环境需求：JAVA环境：JDK7+；数据库环境：oracle10g+/sqlserver2000+/mysql5+；WEB容器环境：jetty6+/tomcat6+；编译环境：maven：3.x+
	<hr />
</body>
</html>