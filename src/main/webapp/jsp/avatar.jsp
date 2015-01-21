<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String contextPath = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<title></title>
<jsp:include page="inc.jsp"></jsp:include>
  <script type="text/javascript">
	$(function(){
		swfobject.addDomLoadEvent(function () {
			var swf = new fullAvatarEditor(app.contextPath+"/jslib/avatar/fullAvatarEditor.swf", 
				app.contextPath+"/jslib/avatar/expressInstall.swf","swfContainer", {
					id : 'swf',
					upload_url :app.contextPath+'/uploadServlet',
					method : 'post',	//传递到上传接口中的查询参数的提交方式。更改该值时，请注意更改上传接口中的查询参数的接收方式
					src_upload : 1,		//是否上传原图片的选项，有以下值：0-不上传；1-上传；2-显示复选框由用户选择
					button_visible : false,//是否显示保存、取消、拍照按钮
					avatar_box_border_width : 0,
					avatar_sizes : '100*100|50*50|32*32',
					avatar_sizes_desc : '100*100像素|50*50像素|32*32像素'
				}, function (msg) {
					switch(msg.code){
						case 1 : 
							console.info("页面成功加载了组件！");
							break;
						case 2 : 
							console.info("已成功加载图片到编辑面板。");
							break;
						case 3 :
							if(msg.type == 0){
								console.info("摄像头已准备就绪且用户已允许使用。");
							}
							else if(msg.type == 1){
								console.info("摄像头已准备就绪但用户未允许使用！");
							}
							else{
								console.info("摄像头被占用！");
							}
							break;
						case 5 : 
							if(msg.type == 0){
								if(msg.content.sourceUrl){
									alert("原图已成功保存至服务器，url为：\n" + msg.content.sourceUrl+"\n\n" + "头像已成功保存至服务器，url为：\n" + msg.content.avatarUrls.join("\n\n"));
								}else{
									alert("头像已成功保存至服务器，url为：\n" + msg.content.avatarUrls.join("\n\n"));
								}
							}
							break;
						}
					}
				);
            });
    	});
    </script>
  <body>
	<div style="width:630px;margin:0 auto;text-align:center">
		<p id="swfContainer">
				本组件需要安装Flash Player后才可使用，请从<a href="http://www.adobe.com/go/getflashplayer">这里</a>下载安装。
		</p>
	</div>
  </body>
</html>
