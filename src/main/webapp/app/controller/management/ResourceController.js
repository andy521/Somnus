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
						isQuery:false,
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
					Ext.create('somnus.view.management.ResourceWindow', {
			            pk: record.record.data.id
			        }).show();
				},
				editclick: function(record){
					Ext.create('somnus.view.management.ResourceWindow', {
			            pk: record.record.data.id,
			            isQuery:false,
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
			        var tree = this.getResourceView().ownerCt.ownerCt.down('treepanel');
			        var id = record.record.data.id;
			        grid.doDelete2(grid, tree, id);
				}
			}
		})
	}
});