Ext.define("somnus.controller.management.RoleController",{
	extend: 'somnus.common.base.BaseController',
	stores: ['management.RoleStore'],
	models: ['management.RoleModel'],
	views: ['management.RoleView', 'management.RoleWindow'],
	refs: [
	       {ref: 'roleView', selector: 'roleView'},
	       {ref: 'roleWindow', selector: 'roleWindow', xtype: 'roleWindow'}
	],
	init:function(){
		this.control({
			'roleView toolbar button[action=add]':{
				click:function(b,e){
					Ext.create('somnus.view.management.RoleWindow', {
						isQuery:false,
			            listeners: {
			                success: function () {
			                    this.getRoleView().getStore().load();
			                },
			                scope: this
			            }
			        }).show();
				}
			},
			'roleView actioncolumn':{
				showclick: function(record){
					Ext.create('somnus.view.management.RoleWindow', {
			            pk: record.record.data.id
			        }).show();
				},
				editclick: function(record){
					Ext.create('somnus.view.management.RoleWindow', {
			            pk: record.record.data.id,
			            isQuery:false,
			            listeners: {
			                success: function () {
			                    this.getRoleView().getStore().load();
			                },
			                failure: function () {
			                    this.getRoleView().close();
			                    this.getRoleView().getStore().load();
			                },
			                scope: this
			            }
			        }).show();
				},
				deleteclick: function(record){
					var grid = this.getRoleView();
			        var id = record.record.data.id;
			        grid.doDelete(grid, id);
				},
				authclick: function(record){
					alert(0);
				}
			}
		})
	}
});