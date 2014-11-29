Ext.define("somnus.store.monitor.OnlineStore",{
	extend:'Ext.data.Store',
	model:'somnus.model.monitor.OnlineModel',
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