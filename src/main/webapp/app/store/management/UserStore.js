Ext.define("somnus.store.management.UserStore",{
	extend: 'somnus.common.base.GridStore',
	constructor: function(config) {
		config = Ext.apply({
			model:'somnus.model.management.UserModel',
			readUrl:app.contextPath + '/base/syuser!grid.action',
			root:'rows'
		}, config);
		this.callParent([config]);
	}
});