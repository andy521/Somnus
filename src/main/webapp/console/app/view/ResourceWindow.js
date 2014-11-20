Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('App',app.basePath+'/console/app');
Ext.require([
    'App.apply.ComboBoxTree',
    'App.apply.ImageBrowse'
]);
Ext.define('App.view.ResourceWindow',{
	extend:'Ext.window.Window',
	alias:'widget.resourcewindow',
	id:'resourcewindow',
	/*closeAction : 'hide',*/
	width: 640,
	height: 320,
	modal : true,//遮罩
	bodyStyle: 'padding: 6px;',
	items : [{
		xtype:'form',
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
				/*readOnly:true,*/
				width:280
            }, {
            	xtype : 'textfield',
				fieldLabel : '资源路劲',
				name:'data.url',
				width:280
            },{
            	xtype : 'combotree',
				fieldLabel : '上级资源',
				name:'data.syresource.id',
				store:'MenuStore',
				checkModel:'single',
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
				width:280
            },{
            	xtype : 'combo',
				fieldLabel : '资源类型',
				name:'data.syresourcetype.id',
				store:{
					fields:[{name:'id',type:'string'},{name:'name',type:'string'}],
					proxy:{
						type:'ajax',
						url:app.contextPath +'/base/syresourcetype!doNotNeedSecurity_combobox.action'
					}
				},
				hiddenName : 'id',
				valueField : 'id',
				displayField : 'name',
				width:280
            },{
            	xtype : 'imagebrowse',
				fieldLabel : '资源图标',
				name:'data.iconCls',
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
				name:'data.target',
				width:280
            }]
        }]
	}]
});