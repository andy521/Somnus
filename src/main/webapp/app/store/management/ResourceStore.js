Ext.define("somnus.store.management.ResourceStore",{
	extend: 'somnus.common.base.TreeStore',
	constructor: function(config) {
		config = Ext.apply({
			model: 'somnus.model.management.ResourceModel',
			baseUrl: 'resource'
		}, config);
		this.callParent([config]);
	}
});