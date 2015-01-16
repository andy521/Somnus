Ext.define('somnus.view.management.UserWindow',{
	extend: 'somnus.common.base.BaseForm',
	alias:'widget.userWindow',
	title: '用户信息',
	width: 640,
	height: 320,
	baseUrl: 'syuser',
	initComponent: function () {
		var me = this;
		this.formPanel = Ext.create('Ext.form.Panel', {
			defaults: {
	            border: false,
	            xtype: 'panel',
	            bodyStyle: 'padding: 8px;',
	            flex: 1
	        },
	        layout: 'hbox',
	        items: [{
	            items: [{
	            	xtype : 'textfield',
					fieldLabel : '编号',
					name:'data.id',
					readOnly:true,
					width:280
	            }, {
	            	xtype : 'textfield',
					fieldLabel : '姓名',
					name:'data.name',
                    allowBlank:false,
					width:280
	            }]
	        }, {
	            items: [{
	            	xtype : 'textfield',
					fieldLabel : '登陆名称',
					name:'data.loginname',
                    allowBlank:false,
					width:280
	            },{
	            	xtype : 'combo',
					fieldLabel : '性别',
					name:'data.sex',
					store : {
						fields : ['text', 'value'],
						data : [{
							text : '女',
							value : '0'
						}, {
							text : '男',
							value : '1'
						}]
					},
					valueField : 'value',
					displayField : 'text',
					queryMode : 'local',
					allowBlank:false,
					width:280
	            }]
	        }]
		});
	this.items = [this.formPanel];
	this.callParent();
	}
});