Ext.define("somnus.store.management.UserStore",{
	extend: 'somnus.common.base.GridStore',
	constructor: function(config) {
		config = Ext.apply({
			model:'somnus.model.management.UserModel',
			baseUrl:'syuser',
			root:'rows'
		}, config);
		this.callParent([config]);
	}
});