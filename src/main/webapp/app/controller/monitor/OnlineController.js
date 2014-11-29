Ext.define('somnus.controller.monitor.OnlineController', {
	extend: 'somnus.common.base.BaseController',
	stores: ['monitor.OnlineStore'],
	models: ['monitor.OnlineModel'],
	views: ['monitor.OnlineView'],
	refs: [
	       {ref: 'onlineView', selector: 'onlineView'}
	],
	init: function () {
		this.control({
			
		});
	}
});