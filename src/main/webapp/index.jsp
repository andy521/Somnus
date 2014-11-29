<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.somnus.model.base.SessionInfo"%>
<%
	String contextPath = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<title>OA</title>
<jsp:include page="inc.jsp"></jsp:include>
<script type="text/javascript" src="<%=contextPath%>/app/common/commons.js "></script>
<script type="text/javascript" src="<%=contextPath%>/app/app.js"></script>

<%
	SessionInfo sessionInfo = (SessionInfo) session.getAttribute("sessionInfo");
	if (sessionInfo == null) {
		request.getRequestDispatcher("/login.jsp").forward(request, response);
	}
%>
</head>
<body>
</body>
</html>