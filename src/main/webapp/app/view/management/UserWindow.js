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
	            },{
	            	xtype:'panel',
	            	padding:'60 60',
	            	border:0,
	            	width:273,
	            	height:161,
	            	autoLoad:{
						scripts:true,
						url:app.contextPath + '/style/uploadbtn.jsp',
					}
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
	            },{
	            	xtype: 'hidden',
                    name: 'data.photo'
	            },{
	            	xtype:'panel',
	            	border:0,
	            	width:280,
	            	height:170,
	            	listeners:{
	            		render:function(panel){
	            			panel.ownerCt.ownerCt.on('actioncomplete',function(){
		            			panel.getEl().setHTML(Ext.String.format("<img style='margin:30px 105px' src='{0}'/>",
		            					panel.ownerCt.down('hidden[name=data.photo]').getValue()));
	            			});
	            		}
	            	}
	            }]
	        }]
		});
	this.items = [this.formPanel];
	this.callParent();
	}
});