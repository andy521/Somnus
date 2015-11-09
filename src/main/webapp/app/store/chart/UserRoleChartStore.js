Ext.define("somnus.store.chart.UserRoleChartStore",{
	extend:'Ext.data.Store',
	model:'somnus.model.chart.UserRoleChartModel',
	proxy:{
		type:'ajax',
		url:app.contextPath + '/base/role!doNotNeedSecurity_userRoleChart.action',
		reader:{
			type:'json'
		}
	},
	autoLoad: true
});