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
		iconCls:'ext-icon-pencil'
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