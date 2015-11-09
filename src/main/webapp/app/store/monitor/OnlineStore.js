Ext.define("somnus.store.monitor.OnlineStore",{
	extend: 'somnus.common.base.GridStore',
	constructor: function(config) {
		config = Ext.apply({
			model:'somnus.model.monitor.OnlineModel',
			baseUrl:'online',
			root:'rows',
			extraParams:{
				sort:'createdatetime',
				order:'desc'
			}
		}, config);
		this.callParent([config]);
	}
});