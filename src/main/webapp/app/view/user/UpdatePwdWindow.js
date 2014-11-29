Ext.define('somnus.view.user.UpdatePwdWindow',{
	extend:'Ext.window.Window',
	alias:'widget.updatepwd',
	title: '修改密码',
	closeAction : 'hide',
	iconCls : 'ext-icon-lock_edit',
	width: 300,
	height: 170,
	modal : true,//遮罩
	bodyStyle: 'padding: 5px;',
	renderTo:Ext.getBody(),
	listeners:{
		show:function(){
			this.items.first().getForm().reset();
		}
	},
	buttons:[{
		text:'修改',
		iconCls:'ext-icon-pencil',
		handler:function(button){
			var form = button.ownerCt.ownerCt.items.first().getForm();
			if(form.isValid()){
				Ext.Ajax.request({
					url:app.contextPath + '/base/syuser!doNotNeedSecurity_updateCurrentPwd.action',
					params:{'data.pwd':form.findField('data.pwd').getValue()},
					success:function(response,option)
					{
						var res = Ext.JSON.decode(response.responseText);
						if(res.success){
							button.ownerCt.ownerCt.hide();
							Ext.Msg.show({
								title : '提示',
								msg : '密码修改成功',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
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
			name : 'data.pwd',
			fieldLabel : '新密码',
			inputType : 'password'
		},{
			fieldLabel : '重复密码',
			inputType : 'password',
			vtype:'password'
		}]
	}]
});