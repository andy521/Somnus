Ext.define('App.view.LockWindow',{
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
		text:'登陆'
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