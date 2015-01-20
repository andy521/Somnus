<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="org.apache.commons.lang3.StringUtils"%>
<%@ page import="com.somnus.model.base.SessionInfo"%>
<%@ page import="com.somnus.model.base.Syrole"%>
<%@ page import="com.somnus.model.base.Syorganization"%>
<%@ page import="com.somnus.model.base.Syresource"%>
<%@ page import="com.somnus.model.easyui.Tree"%>
<%@ page import="com.somnus.util.base.DateUtil"%>
<%@ page import="com.somnus.util.base.BeanUtils"%>
<%@ page import="com.somnus.util.base.ConfigUtil"%>
<%@ page import="com.somnus.util.base.StringUtil"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.Set"%>
<%@ page import="java.util.HashSet"%>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<%String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();%>
<%String contextPath = request.getContextPath();%>
<%String version = "20131115";%>

<%
Map<String, Cookie> cookieMap = new HashMap<String, Cookie>();
Cookie[] cookies = request.getCookies();
if (null != cookies) {
	for (Cookie cookie : cookies) {
		cookieMap.put(cookie.getName(), cookie);
	}
}
String extTheme = "ext-all-neptune.css";//指定如果用户未选择样式，那么初始化一个默认样式
if (cookieMap.containsKey("extTheme")) {
	Cookie cookie = (Cookie) cookieMap.get("extTheme");
	extTheme = cookie.getValue();
}
SessionInfo sessionInfo = (SessionInfo) session.getAttribute(ConfigUtil.getSessionInfoName());
String loginname ="";
String ip ="";
String id ="";
String name ="";
String sex ="";
int age = 0;
String createdatetime ="";
String updatedatetime ="";
String rolehtml ="<ul>";
String organizationhtml ="<ul>";
if (sessionInfo != null) {
	loginname = sessionInfo.getUser().getLoginname();
	ip = sessionInfo.getUser().getIp();
	id = sessionInfo.getUser().getId();
	name = sessionInfo.getUser().getName();
	if (sessionInfo.getUser().getSex() != null && sessionInfo.getUser().getSex().equals("1")) {
		sex = "男";
	} else {
		sex = "女";
	}
	age = sessionInfo.getUser().getAge();
	createdatetime = DateUtil.dateToString(sessionInfo.getUser().getCreatedatetime());
	updatedatetime = DateUtil.dateToString(sessionInfo.getUser().getUpdatedatetime());
	Set<Syrole> roles = sessionInfo.getUser().getSyroles();//用户的角色
	Set<Syorganization> organizations = sessionInfo.getUser().getSyorganizations();//用户的机构
	for (Syrole role : roles){
		rolehtml = rolehtml + StringUtil.formateString("<li title=\"{1}\">{0}</li>", role.getName(), role.getDescription());
	}
	rolehtml = rolehtml +"</ul>";
	for (Syorganization organization : organizations){
		organizationhtml = organizationhtml + StringUtil.formateString("<li>{0}</li>", organization.getName());
	}
	organizationhtml = organizationhtml +"</ul>";
}
%>

<script type="text/javascript">
var app = app || {};
app.currentUser='';
app.loadMsg= '数据正在加载中，请稍后···';
app.url= '';
app.pageSize=20;
app.contextPath = '<%=contextPath%>';
app.basePath = '<%=basePath%>';
app.version = '<%=version%>';
app.pixel_0 = '<%=contextPath%>/style/images/pixel_0.gif';//0像素的背景，一般用于占位
app.loginname =  '<%=loginname%>';
app.id =  '<%=id%>';
app.ip =  '<%=ip%>';
app.name =  '<%=name%>';
app.age =  '<%=age%>';
app.sex =  '<%=sex%>';
app.createdatetime =  '<%=createdatetime%>';
app.updatedatetime =  '<%=updatedatetime%>';
app.role =  '<%=rolehtml%>';
app.organization =  '<%=organizationhtml%>';
</script>
<link rel="shortcut icon" type="image/ico" href="<%=contextPath%>/style/images/favicon.ico" />

<%-- 引入扩展图标 --%>
<link rel="stylesheet" href="<%=contextPath%>/style/syExtIcon.css?version=<%=version%>" type="text/css">

<%-- 引入自定义样式 --%>
<link rel="stylesheet" href="<%=contextPath%>/style/syExtCss.css?version=<%=version%>" type="text/css">

<%-- 引入提示弹出框样式 --%>
<link rel="stylesheet" href="<%=contextPath%>/style/notification.css?version=<%=version%>" type="text/css">

<%-- 引入ext-4.2.1--%>
<link rel="stylesheet" type="text/css" id='extTheme'  href="<%=contextPath%>/jslib/ext-4.2.1/resources/css/<%=extTheme%>" />
<script type="text/javascript" src="<%=contextPath%>/jslib/ext-4.2.1/bootstrap.js"></script>
<script type="text/javascript" src="<%=contextPath%>/jslib/ext-4.2.1/locale/ext-lang-zh_CN.js"></script>

<%-- 引入jQuery--%>
<script type="text/javascript" src="<%=contextPath%>/jslib/jquery-2.1.0.js"></script>
<script type="text/javascript" src="<%=contextPath%>/jslib/jquery.cookie-1.4.0.js"></script>
<%-- 引入头像裁剪 --%>
<script type="text/javascript" src="<%=contextPath%>/jslib/avatar/scripts/swfobject.js"></script>
<script type="text/javascript" src="<%=contextPath%>/jslib/avatar/scripts/fullAvatarEditor.js"></script> 