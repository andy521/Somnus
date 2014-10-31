Ext.define("App.store.UserRoleStore",{
	extend:'Ext.data.Store',
	model:'App.model.UserRoleModel',
	proxy:{
		type:'ajax',
		url:app.contextPath + '/base/syrole!doNotNeedSecurity_userRoleChart.action',
		reader:{
			type:'json'
		}
	},
	autoLoad: true
});