Ext.define("somnus.store.monitor.OnlineStore",{
	extend: 'somnus.common.base.GridStore',
	constructor: function(config) {
		config = Ext.apply({
			model:'somnus.model.monitor.OnlineModel',
			readUrl:app.contextPath + '/base/syonline!grid.action',
			root:'rows'
		}, config);
		this.callParent([config]);
	}
});