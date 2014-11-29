Ext.define('somnus.store.message.MessSearchStore', {
	extend: 'somnus.common.base.GridStore',
	constructor: function(config) {
		config = Ext.apply({
			model: 'somnus.model.message.MessSearchModel',
			baseUrl:'json/messSearch'
		}, config);
		this.callParent([config]);
	}
});