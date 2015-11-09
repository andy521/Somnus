Ext.define("somnus.store.chart.RegisterDateChartStore",{
	extend:'Ext.data.Store',
	model:'somnus.model.chart.RegisterDateChartModel',
	proxy:{
		type:'ajax',
		url:app.contextPath + '/base/user!doNotNeedSecurity_userCreateDatetimeChart.action',
		reader:{
			type:'json'
		}
	},
	autoLoad: true
});