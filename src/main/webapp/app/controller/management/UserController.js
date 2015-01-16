Ext.define("somnus.controller.management.UserController",{
	extend: 'somnus.common.base.BaseController',
	stores: ['management.UserStore'],
	models: ['management.UserModel'],
	views: ['management.UserView', 'management.UserWindow'],
	refs: [
	       {ref: 'userView', selector: 'userView'},
	       {ref: 'userWindow', selector: 'userWindow', xtype: 'userWindow'}
	],
	init:function(){
		this.control({
			'userView toolbar button[action=add]':{
				click:function(b,e){
					Ext.create('somnus.view.management.UserWindow', {
						isQuery:false,
			            listeners: {
			                success: function () {
			                    this.getUserView().getStore().load();
			                },
			                scope: this
			            }
			        }).show();
				}
			},
			'userView actioncolumn':{
				showclick: function(record){
					Ext.create('somnus.view.management.UserWindow', {
			            pk: record.record.data.id
			        }).show();
				},
				editclick: function(record){
					Ext.create('somnus.view.management.UserWindow', {
			            pk: record.record.data.id,
			            isQuery:false,
			            listeners: {
			                success: function () {
			                    this.getUserView().getStore().load();
			                },
			                failure: function () {
			                    this.getUserView().close();
			                    this.getUserView().getStore().load();
			                },
			                scope: this
			            }
			        }).show();
				},
				grantRoleclick: function(record){
					Ext.create('somnus.view.management.RoleGrant', {
			            pk: record.record.data.id
			        }).show();
				},
				grantOrgclick: function(record){
					Ext.create('somnus.view.management.RoleGrant', {
			            pk: record.record.data.id
			        }).show();
				},
				deleteclick: function(record){
					var grid = this.getUserView();
			        var id = record.record.data.id;
			        grid.doDelete(grid, id);
				}
			}
		})
	}
});