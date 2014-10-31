Ext.define("App.store.OnlineStore",{
	extend:'Ext.data.Store',
	model:'App.model.OnlineModel',
	proxy:{
		type:'ajax',
		url:app.contextPath + '/base/syonline!grid.action',
		reader:{
			type:'json',
			root:'rows'
		}
	},
	autoLoad: true
});