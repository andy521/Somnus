Ext.define("somnus.store.management.RoleStore",{
	extend: 'somnus.common.base.GridStore',
	constructor: function(config) {
		config = Ext.apply({
			model:'somnus.model.management.RoleModel',
			baseUrl:'role',
			root:'rows'
		}, config);
		this.callParent([config]);
	}
});