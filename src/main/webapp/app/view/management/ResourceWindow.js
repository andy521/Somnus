Ext.define('somnus.view.management.ResourceWindow',{
	extend: 'somnus.common.base.BaseForm',
	alias:'widget.resourceWindow',
	title: '详细信息',
	width: 640,
	height: 320,
	baseUrl: 'syresource',
	initComponent: function () {
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
					name:'id',
					/*readOnly:true,*/
					width:280
	            }, {
	            	xtype : 'textfield',
					fieldLabel : '资源路劲',
					name:'url',
					vtype: 'unique',
                    vtypeEntity: 'Resource',
					width:280
	            },{
	            	xtype : 'combotree',
					fieldLabel : '上级资源',
					name:'pid',
					store:'management.ResourceTreeStore',
					checkModel:'single',
					width:280
	            },{
	            	xtype : 'numberfield',
					fieldLabel : '顺序',
					name:'seq',
					width:280,
					value:100
	            },{
	            	xtype : 'textarea',
					fieldLabel : '资源描述',
					name:'description',
					width:280
	            }]
	        }, {
	            items: [{
	            	xtype : 'textfield',
					fieldLabel : '资源名称',
					name:'name',
					vtype: 'unique',
                    vtypeEntity: 'Resource',
					width:280
	            },{
	            	xtype : 'basecombo',
					fieldLabel : '资源类型',
					name:'typeId',
					baseUrl:'syresourcetype',
					width:280
	            },{
	            	xtype : 'imagebrowse',
					fieldLabel : '资源图标',
					name:'iconCls',
					buttonText: '',
		            buttonConfig: {
		                iconCls: 'ext-icon-camera'
		            },
		            url:app.contextPath + '/style/icons.jsp',
		            buttons:[{
						text:'确定',
						handler:function(btn){
							selectIcon(btn.ownerCt.ownerCt,Ext.getCmp('resourcewindow').down('form').getForm().findField('data.iconCls'));
						}
					}],
					width:280
	            },{
	            	xtype : 'textfield',
					fieldLabel : '目标',
					name:'target',
					width:280
	            }]
	        }]
		});
	this.items = [this.formPanel];
	this.callParent();
	}
});