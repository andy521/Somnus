Ext.define("somnus.controller.management.ResourceController",{
	extend: 'somnus.common.base.BaseController',
	stores: ['management.ResourceStore'],
	models: ['management.ResourceModel'],
	views: ['management.ResourceView', 'management.ResourceWindow'],
	refs: [
	       {ref: 'resourceView', selector: 'resourceView'},
	       {ref: 'resourceWindow', selector: 'resourceWindow', xtype: 'resourceWindow'}
	],
	init:function(){
		this.control({
			'resourceView toolbar button[action=allopen]':{
				click:function(b,e){
					var tree = b.ownerCt.ownerCt;
					tree.expandAll();
				}
			},
			'resourceView toolbar button[action=allclose]':{
				click:function(b,e){
					var tree = b.ownerCt.ownerCt;
					tree.collapseAll();
				}
			},
			'resourceView toolbar button[action=refresh]':{
				click:function(b,e){
					var tree = b.ownerCt.ownerCt;
					tree.getStore().reload();
				}
			},
			'resourceView toolbar button[action=add]':{
				click:function(b,e){
					Ext.create('somnus.view.management.ResourceWindow',{
						title : '添加资源信息',
						iconCls:'ext-icon-note_add',
						buttons:[{
							text:'添加'
						}]
					}).show();
				}
			},
			'resourceView actioncolumn':{
				showclick: function(record){
					Ext.create('somnus.view.management.ResourceWindow', {
						pk: record.record.data.id
					}).show();
				},
				editclick: function(record){
					alert(3);
				},
				deleteclick: function(record){
					alert(3);
				}
			}
		})
	}
});