Ext.define('somnus.controller.monitor.MonitoringController', {
	extend: 'somnus.common.base.BaseController',
	stores: [],
	models: [],
	views: ['monitor.MonitoringView'],
	refs: [
	       {ref: 'monitoringView', selector: 'monitoringView'}
	],
	init: function () {
		this.control({
			
		});
	}
});