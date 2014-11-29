Ext.define("somnus.controller.management.OrganizationController",{
	extend: 'somnus.common.base.BaseController',
	stores: ['management.OrganizationStore'],
	models: ['management.OrganizationModel'],
	views: ['management.OrganizationView', 'management.OrganizationWindow'],
	refs: [
	       {ref: 'organizationView', selector: 'organizationView'},
	       {ref: 'organizationWindow', selector: 'organizationWindow', xtype: 'organizationWindow'}
	],
	init:function(){
		this.control({
			'organizationView toolbar button[action=addresource]':{
				click:function(b,e){
					alert();
				}
			},
			'organizationView toolbar button[action=allopen]':{
				click:function(b,e){
					var tree = b.ownerCt.ownerCt;
					tree.expandAll();
				}
			},
			'organizationView toolbar button[action=allclose]':{
				click:function(b,e){
					var tree = b.ownerCt.ownerCt;
					tree.collapseAll();
				}
			},
			'organizationView toolbar button[action=refreshresource]':{
				click:function(b,e){
					var tree = b.ownerCt.ownerCt;
					tree.getStore().reload();
				}
			},
			'organizationView actioncolumn':{
				showclick: function(record){
					Ext.create('somnus.view.management.OrganizationWindow', {
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