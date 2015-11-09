var login = function(){
	var button = Ext.getCmp('loginbtn');
	var form = button.ownerCt.ownerCt.down('form').getForm();
	var mask = new Ext.LoadMask(Ext.getBody(), {
		msg : '登录验证中...',
		removeMask : true
	});
	if(form.isValid()){
		button.disable();
		mask.show();
		// 记住用户名密码
		if (Ext.getCmp('btn_login_rememberme').pressed) {
			$.cookie("loginname", form.findField('data.loginname').getValue(),{expires : 7});
			$.cookie("pwd", form.findField('data.pwd').getValue(),{expires : 7});
			$.cookie("extTheme", form.findField('data.extTheme').getValue(),{expires : 7});
		} else {
			$.removeCookie('loginname');
			$.removeCookie('pwd');
			$.removeCookie('extTheme');
		}
		form.submit({
			url:app.contextPath + '/base/user!doNotNeedSessionAndSecurity_login.action',
			params:{'data.loginname':form.findField('data.loginname').getValue(),'data.pwd':form.findField('data.pwd').getValue()},
			success:function(form, action)
			{
				location.replace(app.contextPath + '/index.jsp'); 
			},
			failure:function(form, action){
				button.enable();
				mask.hide();
				Ext.Msg.show({
					title : '错误提示',
					msg : action.result.msg,
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.ERROR
				});
			}
		});
	}
}
var getBrowserName = function() {
	var name = '未知浏览器';
	if (Ext.isIE6)
		name = "IE6";
	if (Ext.isIE7)
		name = "IE7";
	if (Ext.isIE8)
		name = "IE8";
	if (Ext.isIE9)
		name = "IE9";
	if (Ext.isChrome)
		name = "Chrome";
	if (Ext.isOpera)
		name = "Opera";
	if (Ext.isSafari)
		name = "Safari";
	if (Ext.isGecko)
		name = "FireFox";
	return name;
};
Ext.onReady(function(){
	var loginWin = Ext.create('Ext.window.Window', {
		id : 'loginWin',
		title : '系统登录',
		width : 500,
		height : 360,
		resizable : false,
		draggable : true,
		layout : 'border',
		bodyStyle : 'padding:5px;',
		closable : false,
		iconCls : 'ext-icon-lock_open',
		autoShow:true,
		renderTo:Ext.getBody(),
		items:[{
			xtype:'panel',
			baseCls : 'x-plain',
			region : 'center',
			html:'<div style="width:250px;margin:0 auto;color:#fff;font-size:30px;font-weight:bold;font-family:"宋体",Arial;">综合应用管理平台</div>'
		},{
			xtype:'form',
			region : 'south',
			border : false,
			bodyStyle : "padding: 20px 100px",
			baseCls : 'x-plain',
			defaults : {
				width : 280,
				labelWidth : 60,
				labelAlign : 'right',
				allowBlank : false
			},
			height : 110,
			items:[{
				xtype : 'textfield',
				fieldLabel : '登录名',
				name : 'data.loginname',
				fieldStyle: { 
					background: Ext.String.format('#ffffff url({0}/style/images/ext_icons/user.png) no-repeat left center',app.contextPath), 
					paddingLeft: '20px' 
				}
			},{
				xtype : 'textfield',
				inputType : 'password',
				name : 'data.pwd',
				fieldLabel : '密码',
				fieldStyle: {
					background: Ext.String.format('#ffffff url({0}/style/images/ext_icons/key.png) no-repeat left center',app.contextPath), 
					paddingLeft: '20px' 
				}
			},{
				xtype : 'combo',
				fieldLabel : '界面模式',
				name:'data.extTheme',
				store : {
					fields : ['text', 'value'],
					data : [{
						text : '海王星',
						value : 'ext-all-neptune.css'
					}, {
						text : '经典蓝',
						value : 'ext-all.css'
					}]
				},
				valueField : 'value',
				displayField : 'text',
				queryMode : 'local',
				value : 'ext-all-neptune.css'
			}]
		}],
		dockedItems:[{
			xtype : 'toolbar',
			dock : 'bottom',
			items:[{
				text : '记住我',
				id : 'btn_login_rememberme',
				iconCls : "ext-icon-emoticon_smile",
				enableToggle : true,
				height : 30
			},'  ',{
				text : '使用Chrome™(Google)浏览器运行本系统',
				height : 30,
				iconCls : "google-chrome",
				tooltip : '本系统在Chrome™(Google)浏览器下运行,速度是普通浏览器的3倍以上',
				handler : function() {
					var googleWin = Ext.create('Ext.window.Window', {
						title : 'Google浏览器安装',
						width : 850,
						height : 450,
						closable : true,
						html : "<iframe src='http://www.google.com/chrome/eula.html?hl=zh-cn' style='width:100%; height:100%;'></iframe>"
					});
					googleWin.show();
				}
			},'->',getBrowserName()]
		},{
			xtype : 'toolbar',
			dock : 'bottom',
			ui : 'footer',
			height : 70,
			layout : {
				pack : 'center'
			},
			items:[{
				text : '登 录',
				id:'loginbtn',
				handler : login,
				scale : 'medium',
				width : 100,
				height : 35,
				iconCls : "gnome-keyring-manager"
			},{
				text : '重 置',
				scale : 'medium',
				width : 100,
				height : 35,
				iconCls : "new-view-refresh",
				handler:function(btn){
					btn.ownerCt.ownerCt.down('form').getForm().reset();
				}
			}]
		}]
	});
	var map = new Ext.util.KeyMap(loginWin.getEl(), {
	    key: Ext.EventObject.ENTER,
	    fn: login,
	    scope: this
	});
	
	loginWin.down('form').getForm().findField('data.loginname').focus(true,100);
	
	if(!Ext.isEmpty($.cookie('loginname'))){
		Ext.getCmp('btn_login_rememberme').toggle(true, false);
		var form = loginWin.down('form').getForm();
		form.findField('data.loginname').setValue($.cookie("loginname"));
		form.findField('data.pwd').setValue($.cookie("pwd"));
		form.findField('data.extTheme').setValue($.cookie("extTheme"));
	}
});