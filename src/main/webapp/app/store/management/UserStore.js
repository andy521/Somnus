Ext.define("somnus.store.management.UserStore",{
	extend: 'somnus.common.base.GridStore',
	constructor: function(config) {
		config = Ext.apply({
			model:'somnus.model.management.UserModel',
			baseUrl:'syuser',
			root:'rows',
			extraParams:{
				sort:'createdatetime',
				order:'desc'
			}
		}, config);
		this.callParent([config]);
	}
});