Ext.define('somnus.store.message.MessApprovalStore', {
	extend: 'somnus.common.base.GridStore',
	constructor: function(config) {
		config = Ext.apply({
			model: 'somnus.model.message.MessApprovalModel',
			baseUrl:'json/messApproval'
		}, config);
		this.callParent([config]);
	}
});