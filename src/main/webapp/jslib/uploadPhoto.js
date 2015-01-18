$(function() {
	$("#uploadFile").uploadify({  
		swf: app.contextPath + '/jslib/uploadify/uploadify.swf',  		//[必须设置]swf的路径
		uploader: app.contextPath + '/uploadify!upload.action',  		//[必须设置]上传文件触发的url
		buttonImage:app.contextPath +'/style/images/browse.png',
		width: 153,  										//设置浏览按钮的宽度 ，默认值：110
		height:41,											//设置浏览按钮的高度， 默认值：30。
		fileObjName:'photo',  								//上传文件name
		auto: true,  										//设置为true当选择文件后就直接上传了，为false需要点击上传按钮才上传
		buttonText: '' ,  									//浏览按钮的文本，默认值：BROWSE 
		multi: false,  										//设置为true时可以上传多个文件
		queueID: 'some_file_queue',  						//文件队列的ID，该ID与存放文件队列的div的ID一致
		fileTypeExts:'*.jpg;*.jpge;*.gif;*.png',  			//允许上传的文件后缀  
		fileSizeLimit:'5MB',  								//上传文件的大小限制  
		queueSizeLimit: 1,  								//上传数量  
		progressData : 'all',								//队列中显示文件上传进度的方式：all-上传速度+百分比，percentage-百分比，speed-上传速度
		removeCompleted : true,								//上传成功后的文件，是否在队列中自动删除
		method:'post',										//和后台交互的方式：post/get
		onUploadSuccess: function(file, data, response){
				var url = eval('(' + data + ')'); 
				Ext.create('Ext.window.Window', {
					title : '编辑图片',
					modal: true,
					width : 748,
					height : 500,
					closable : true,
					autoScroll:true,
					html:Ext.String.format('<img src="{0}/upload/{1}">',app.contextPath,url.newImgPath[0]),
					buttons:[{
						xtype:'button',
						text:'确定'
					},{
						xtype:'button',
						text:'取消'
					}]
				}).show();
		},
		onFallback:function(){  
				alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");  
		},
		//当每个文件添加至队列后触发
		onSelect :function(file){
		},
		//当队列中的所有文件全部完成上传时触发
		onQueueComplete : function(stats){
		},
		//当文件选定发生错误时触发
		onSelectError:function(file, errorCode, errorMsg){  
				switch(errorCode) {  
					case -100:  
						alert("上传的文件数量已经超出系统限制的"+$('#uploadFile').uploadify('settings','queueSizeLimit')+"个文件！");  
						break;  
					case -110:  
						alert("文件 ["+file.name+"] 大小超出系统限制的"+$('#uploadFile').uploadify('settings','fileSizeLimit')+"大小！");  
						break;  
					case -120:  
						alert("文件 ["+file.name+"] 大小异常！");  
						break;  
					case -130:  
						alert("文件 ["+file.name+"] 类型不正确！");  
						break;  
				}
		}  
	});  
});  