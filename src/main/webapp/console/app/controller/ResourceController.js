Ext.define("App.controller.ResourceController",{
	extend:'Ext.app.Controller',
	init:function(){
		this.control({
			'resourceview toolbar button[id=addresource]':{
				click:function(b,e){
					Ext.create('App.view.ResourceWindow',{
						title : '添加资源信息',
						iconCls:'ext-icon-note_add',
						buttons:[{
							text:'添加',
							handler:function(btn){
								Ext.getCmp('resourcewindow').down('form').getForm().submit({
									url:app.contextPath + '/base/syresource!save.action',
									params:Ext.getCmp('resourcewindow').down('form').getForm().getValues(),
									success:function(form, action)
									{
										if(action.result.success){
											 b.ownerCt.ownerCt.getStore().reload();
											 b.ownerCt.ownerCt.ownerCt.ownerCt.child('panel treepanel').getStore().reload();
											 btn.ownerCt.ownerCt.close();
											 Ext.create('App.util.Notification', {
													position: 't',
													cls: 'ux-notification-light',
													closable: true,
													title: '提示信息',
													width:'400px',
													autoCloseDelay: 3000,
													iconCls: 'ux-notification-icon-information',
													slideBackDuration: 500,
													slideInAnimation: 'bounceOut',
													slideBackAnimation: 'easeIn',
													html: '添加资源成功'
												}).show();
										}else{
											button.enable();
											mask.hide();
											Ext.Msg.show({
												title : '错误提示',
												msg : action.result.msg,
												buttons : Ext.Msg.OK,
												icon : Ext.Msg.ERROR
											});
										}
									}
								});
							}
						}]
					}).show();
				}
			},
			'resourceview toolbar button[id=allopenresource]':{
				click:function(b,e){
					var tree = b.ownerCt.ownerCt;
					tree.expandAll();
				}
			},
			'resourceview toolbar button[id=allcloseresource]':{
				click:function(b,e){
					var tree = b.ownerCt.ownerCt;
					tree.collapseAll();
				}
			},
			'resourceview toolbar button[id=refreshresource]':{
				click:function(b,e){
					var tree = b.ownerCt.ownerCt;
					tree.getStore().reload();
				}
			},
			'resourceview  actioncolumn':{
				showclick: function(record){},
				editclick: function(record){},
				deleteclick: function(record){}
			}
		})
	},
	views:['ResourceView'],
	stores:['ResourceStore'],
	models:['ResourceModel']
});