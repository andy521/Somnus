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
			'roleView actioncolumn':{
				showclick: function(record){
					alert(3);
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