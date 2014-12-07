Ext.define('somnus.common.base.GridStore', {
	extend: 'Ext.data.Store',
	constructor: function (config) {
		config = Ext.apply({}, config);
		Ext.applyIf(config, {
			proxy: {
				type: 'ajax',
				pageParam: 'pageNo',
				limitParam: 'pageSize',
				api: {
					read: config.readUrl || app.contextPath + '/base/'+config.baseUrl +'!grid.action',
					create: app.contextPath + '/base/'+this.baseUrl +'!save.action',
					update: app.contextPath + '/base/'+this.baseUrl +'!update.action',
					destroy: app.contextPath + '/base/'+this.baseUrl +'!delete.action',
				},
				actionMethods: {
					read: 'POST'
				},
				extraParams: config.extraParams || '',
				timeout: 1000 * 60 * 60,
				reader: {
					type: 'json',
					root: config.root || 'results',
					messageProperty: config.messageProperty || 'message'
				},
				writer: {
					type: 'json'
				},
				listeners: {
					exception: function (proxy, response, operation) {
						Ext.MessageBox.show({
							title: 'REMOTE EXCEPTION',
							msg: operation.getError(),
							icon: Ext.MessageBox.ERROR,
							buttons: Ext.Msg.OK
						});
					}
				}
			},
			pageSize: config.pageSize || app.pageSize
		});
		this.callParent([config]);
	}
});
