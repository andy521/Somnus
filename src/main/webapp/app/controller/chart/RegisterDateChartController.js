Ext.define('somnus.controller.chart.RegisterDateChartController', {
	extend: 'somnus.common.base.BaseController',
	stores: ['chart.RegisterDateChartStore'],
	models: ['chart.RegisterDateChartModel'],
	views: ['chart.RegisterDateChartView'],
	refs: [
	       {ref: 'registerDateChartView', selector: 'registerDateChartView'}
	],
	init: function () {
		this.control({
			
		});
	}
});