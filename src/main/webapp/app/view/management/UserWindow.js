Ext.define('somnus.view.management.UserWindow',{
	extend: 'somnus.common.base.BaseForm',
	alias:'widget.userWindow',
	title: '用户信息',
	width: 630,
	height:625,
	baseUrl: 'syuser',
	initComponent: function () {
		var me = this;
		this.formPanel = Ext.create('Ext.form.Panel', {
	        layout: {  
	        	type:'vbox',  
                padding:'5',  
                align:'stretch'  
            },  
	        items:[{
	        	xtype: 'panel',
	        	border: false,
	        	flex: 1,
		        layout : {  
	                type : 'hbox',  
	                /*padding : '5',*/  
	                align : 'stretch',
	            },
		        items:[{
		        	xtype: 'panel',
		        	border: false,
		        	flex: 5,
		        	items:[{
		        		xtype : 'textfield',
						fieldLabel : '编号',
						labelWidth:80,
						name:'data.id',
						readOnly:true,
		        	},{
		        		xtype : 'textfield',
						fieldLabel : '姓名',
						labelWidth:80,
						name:'data.name',
	                    allowBlank:false,
		        	}]
		        },{
		        	xtype: 'panel',
		        	border: false,
		        	flex: 5,
		        	items:[{
		        		xtype : 'textfield',
						fieldLabel : '登陆名称',
						labelWidth:80,
						name:'data.loginname',
	                    allowBlank:false,
		        	},{
		        		xtype : 'combo',
						fieldLabel : '性别',
						labelWidth:80,
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
		        	}]
		        },{
		        	xtype: 'panel',
		        	border: false,
		        	flex: 2,
		        	items:[{
		        		xtype: 'hidden',
		        		itemId:'photo',
	                    name: 'data.photo'
		        	},{
		        		xtype:'panel',
		        		itemId:'imgPanel',
		            	border:1,
		            	width: 100,
		            	height:100,
		            	listeners:{
		            		render:function(panel){
		            			panel.ownerCt.ownerCt.ownerCt.on('actioncomplete',function(){
			            			panel.getEl().setHTML(Ext.String.format("<img style='width:100px;height:100px;' src='{0}{1}'/>",
			            					app.contextPath,panel.ownerCt.down('hidden[name=data.photo]').getValue()));
		            			});
		            		}
		            	}
		        	}]
		        }]
	        },{
	        	xtype: 'panel',
	        	border: false,
	        	flex:4,
	        	autoLoad:{
    				scripts:true,
    				url:app.contextPath+'/jsp/avatar.jsp'
    			}
	        }]
		});
	this.items = [this.formPanel];
	this.callParent();
	}
});