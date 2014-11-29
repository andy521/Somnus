Ext.define('somnus.view.user.LockWindow',{
	extend:'Ext.window.Window',
	alias:'widget.lockwindow',
	title: '解锁登录',
	closable : false,
	iconCls : 'ext-icon-lock_open',
	width: 300,
	height: 170,
	modal : true,//遮罩
	bodyStyle: 'padding: 5px;',
	buttons:[{
		text:'登陆',
		iconCls : "gnome-keyring-manager",
		handler:function(button){
			var form = button.ownerCt.ownerCt.items.first().getForm();
			if(form.isValid()){
				button.disable();
				Ext.Ajax.request({
					url:app.contextPath + '/base/syuser!doNotNeedSessionAndSecurity_login.action',
					params:{'data.loginname':form.findField('data.loginname').getValue(),'data.pwd':form.findField('data.pwd').getValue()},
					success:function(response,option)
					{
						var res = Ext.JSON.decode(response.responseText);
						if(res.success){
							button.ownerCt.ownerCt.hide();
							Ext.Msg.show({
								title: '信息',
								msg: '登陆成功！',
								buttons: Ext.Msg.OK,
								icon: Ext.Msg.INFO
							});
						}else{
							button.enable();
							Ext.Msg.show({
								title : '错误提示',
								msg : res.msg,
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.ERROR
							});
						}
					}
				});
			}
		}
	}],
	items:[{
		xtype:'form',
		bodyStyle:'padding:10px 10px',
		defaultType: 'textfield',
		defaults:{
			labelSeparator :'：',
			labelWidth : 80,
			width : 250,
			allowBlank : false,
			labelAlign : 'left',
			msgTarget :'side'
		},
		items:[{
			fieldLabel : '登陆名',
			readOnly:true,
			name : 'data.loginname',
			value:app.loginname
		},{
			name : 'data.pwd',
			fieldLabel : '密码',
			inputType : 'password'
		}]
	}]
});