Ext.define('somnus.view.management.ResourceWindow',{
	extend: 'somnus.common.base.BaseForm',
	alias:'widget.resourceWindow',
	title: '资源信息',
	width: 640,
	height: 320,
	baseUrl: 'syresource',
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
					fieldLabel : '资源路劲',
					name:'data.url',
					vtype: 'unique',
                    vtypeEntity: 'Resource',
                    allowBlank:false,
					width:280
	            },{
	            	xtype : 'treepicker',
					fieldLabel : '上级资源',
					name:'data.syresource.id',
					store:'management.ResourceTreeStore',
					allowBlank:false,
					width:280
	            },{
	            	xtype : 'numberfield',
					fieldLabel : '顺序',
					name:'data.seq',
					width:280,
					value:100
	            },{
	            	xtype : 'textarea',
					fieldLabel : '资源描述',
					name:'data.description',
					width:280
	            }]
	        }, {
	            items: [{
	            	xtype : 'textfield',
					fieldLabel : '资源名称',
					name:'data.name',
					vtype: 'unique',
                    vtypeEntity: 'Resource',
                    allowBlank:false,
					width:280
	            },{
	            	xtype : 'basecombo',
					fieldLabel : '资源类型',
					name:'data.syresourcetype.id',
					baseUrl:'syresourcetype',
					allowBlank:false,
					width:280
	            },{
	            	xtype : 'imagebrowse',
					fieldLabel : '资源图标',
					name:'data.iconCls',
					buttonText: '',
		            buttonConfig: {
		                iconCls: 'ext-icon-camera'
		            },
		            url:app.contextPath + '/jsp/icons.jsp',
		            buttons:[{
						text:'确定',
						handler:function(btn){
							selectIcon(btn.ownerCt.ownerCt,me.down('form').getForm().findField('data.iconCls'));
						}
					}],
					width:280
	            },{
	            	xtype : 'textfield',
					fieldLabel : '目标',
					name:'data.target',
					width:280
	            }]
	        }]
		});
	this.items = [this.formPanel];
	this.callParent();
	}
});