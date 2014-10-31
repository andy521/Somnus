Ext.define("App.store.UserCreateDatetimeStore",{
	extend:'Ext.data.Store',
	model:'App.model.UserCreateDatetimeModel',
	proxy:{
		type:'ajax',
		url:app.contextPath + '/base/syuser!doNotNeedSecurity_userCreateDatetimeChart.action',
		reader:{
			type:'json'
		}
	},
	autoLoad: true
});