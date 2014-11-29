Ext.define('somnus.store.statistical.ChlStatStore', {
	extend: 'somnus.common.base.GridStore',
	constructor: function (config) {
		config = Ext.apply({
			model: 'somnus.model.statistical.ChlStatModel',
			readUrl: 'json/stat/queryChannelStat.json',
			baseUrl: 'stat'
		}, config);
		this.callParent([config]);
	}
});