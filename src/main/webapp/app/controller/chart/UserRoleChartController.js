Ext.define('somnus.controller.chart.UserRoleChartController', {
	extend: 'somnus.common.base.BaseController',
	stores: ['chart.UserRoleChartStore'],
	models: ['chart.UserRoleChartModel'],
	views: ['chart.UserRoleChartView'],
	refs: [
	       {ref: 'userRoleChartView', selector: 'userRoleChartView'}
	],
	init: function () {
		this.control({
			
		});
	}
});