Ext.define('somnus.common.base.GridStore', {
	extend: 'Ext.data.Store',
	constructor: function (config) {
		config = Ext.apply({}, config);
		Ext.applyIf(config, {
			proxy: {
				type: 'ajax',
				pageParam: 'page',
				limitParam: 'pageSize',
				api: {
					read: config.readUrl || app.contextPath + '/base/'+config.baseUrl +'!grid.action',
					create: app.contextPath + '/base/'+config.baseUrl +'!save.action',
					update: app.contextPath + '/base/'+config.baseUrl +'!update.action',
					destroy: app.contextPath + '/base/'+config.baseUrl +'!delete.action',
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
						/*Ext.MessageBox.show({
							title: 'REMOTE EXCEPTION',
							msg: operation.getError(),
							icon: Ext.MessageBox.ERROR,
							buttons: Ext.Msg.OK
						});*/
						Ext.Msg.show({
							title: '信息',
							msg: '对不起，当前登录已过期，请重新登录！',
							buttons: Ext.Msg.OK,
							icon: Ext.Msg.INFO,
							fn: function () {
								window.location.href = app.contextPath;
							}
						});
					}
				}
			},
			/*pageSize: config.pageSize || app.pageSize*/
		});
		this.callParent([config]);
	}
});
