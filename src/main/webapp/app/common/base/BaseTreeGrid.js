Ext.define('somnus.common.base.BaseTreeGrid', {
	extend: 'Ext.tree.Panel',
	mixins: ['somnus.common.base.BaseControllerUtil'],
	emptyText: '目前查询结果为空！',
	rootVisible:false,
	closable:true,
	autoQuery: true,
	initComponent: function () {
		this.dockedItems = Ext.apply([], this.dockedItems);
		/*if (this.autoQuery === true) {
			this.on('afterrender', function () {
				this.store.load();
			}, this);
		}*/
		this.callParent();
	}
});
