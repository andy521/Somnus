Ext.define('somnus.common.base.BaseGrid', {
	extend: 'Ext.grid.Panel',
	mixins: ['somnus.common.base.BaseControllerUtil'],
	enablePagginBar: true,
	emptyText: '目前查询结果为空！',
	closable:true,
	autoQuery: true,
	initComponent: function () {
		this.dockedItems = Ext.apply([], this.dockedItems);
		if (this.enablePagginBar === true) {
			this.dockedItems.push({
				xtype: 'pagingtoolbar',
				store: this.store,
				dock: 'bottom',
				displayInfo: true
			});
		}
		if (this.autoQuery === true) {
			this.on('afterrender', function () {
				this.store.loadPage(1);
			}, this);
		}
		this.callParent();
	}
});
