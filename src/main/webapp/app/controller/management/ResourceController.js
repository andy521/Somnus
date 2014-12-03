Ext.define("somnus.controller.management.ResourceController",{
	extend: 'somnus.common.base.BaseController',
	stores: ['management.ResourceStore','management.ResourceTreeStore'],
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
					Ext.create('somnus.view.management.ResourceWindow', {
			            listeners: {
			                success: function () {
			                    this.getResourceView().getStore().load();
			                },
			                scope: this
			            }
			        }).show();
				}
			},
			'resourceView actioncolumn':{
				showclick: function(record){
					var store=this.getResourceView().getStore();
			        var userName = this.getResourceView().down('#userName').getValue();
			        Ext.apply(store.getProxy().extraParams, {
			            userName: userName
			        });
			        store.loadPage(1);
				},
				editclick: function(record){
					Ext.create('somnus.view.management.ResourceWindow', {
			            pk: record.record.data.id,
			            listeners: {
			                success: function () {
			                    this.getResourceView().getStore().load();
			                },
			                failure: function () {
			                    this.getResourceWindow().close();
			                    this.getResourceView().getStore().load();
			                },
			                scope: this
			            }
			        }).show();
				},
				deleteclick: function(record){
			        var grid = this.getResourceView();
			        grid.doDelete(grid, 'id');
				}
			}
		})
	}
});