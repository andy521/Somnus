Ext.define("App.controller.OrganizationController",{
	extend:'Ext.app.Controller',
	init:function(){
		this.control({
			'organizationview toolbar button[id=addresource]':{
				click:function(b,e){
					alert();
				}
			},
			'organizationview toolbar button[id=allopen]':{
				click:function(b,e){
					var tree = b.ownerCt.ownerCt;
					tree.expandAll();
				}
			},
			'organizationview toolbar button[id=allclose]':{
				click:function(b,e){
					var tree = b.ownerCt.ownerCt;
					tree.collapseAll();
				}
			},
			'organizationview toolbar button[id=refreshresource]':{
				click:function(b,e){
					var tree = b.ownerCt.ownerCt;
					tree.getStore().reload();
				}
			}
		})
	},
	views:['OrganizationView'],
	stores:['OrganizationStore'],
	models:['OrganizationModel']
});