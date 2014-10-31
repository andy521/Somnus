Ext.onReady(function(){
	Ext.application({
		name:"App",
		paths:{
			'Ext':app.basePath+"/jslib/ext-4.2.1/",
			'App':app.basePath+'/console/app'
		},
		launch:function(){
			Ext.create('Ext.container.Viewport',{
				layout:'border',
				frame : true,
				id:'main',
				items:[{
					xtype:'panel',
					region: 'north',
					items:[{
						xtype:'northview'
					}],
					height: 100,
					layout:'fit'
				},{
					xtype:'box',
					region: 'south',
					html:'<div style="margin:0 auto;width:160px;padding:5px;">版权所有@<a href="mailto:928200207@qq.com">Smile</a></div>',
					height: 30,
					layout:'fit'
				},{
					xtype: 'panel',
					region:'west',
					title: '导航',
					width:200,
					collapsible : true,
					split : true,
					layout:'fit',
					items:{
						xtype:'menuview'
					}
				},{
					xtype:'tabpanel',
					region:'center',
					id:'tabview',
					activeTab : 0,
					items : [{
						title : '欢迎使用',
						iconCls:'ext-icon-heart',
						layout : 'fit',
						bodyStyle : 'padding:0px',
						html:Ext.formatString('<iframe src="{0}/welcome.jsp" allowTransparency="true" style="border: 0; width: 100%; height: 99%;" frameBorder="0"></iframe>' , app.contextPath)
					}]
				}]
			});
		},
		controllers:['NorthController','MenuController','ResourceController','RoleController','OrganizationController','UserController','UserCreateDatetimeController','UserRoleController','OnlineController']
	});
});