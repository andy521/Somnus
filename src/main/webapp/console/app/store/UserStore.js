Ext.define("App.store.UserStore",{
	extend:'Ext.data.Store',
	model:'App.model.UserModel',
	proxy:{
		type:'ajax',
		url:app.contextPath + '/base/syuser!grid.action',
		reader:{
			type:'json',
			root:'rows'
		}
	},
	autoLoad: true
});