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
			'userView actioncolumn':{
				showclick: function(record){
					Ext.create('somnus.view.management.UserWindow', {
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