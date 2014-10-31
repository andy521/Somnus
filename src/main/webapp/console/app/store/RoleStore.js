Ext.define("App.store.RoleStore",{
	extend:'Ext.data.Store',
	model:'App.model.RoleModel',
	proxy:{
		type:'ajax',
		url:app.contextPath + '/base/syrole!grid.action',
		reader:{
			type:'json',
			root:'rows'
		}
	},
	autoLoad: true
});