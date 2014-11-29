Ext.define('somnus.store.statistical.AppStatStore', {
	extend: 'somnus.common.base.GridStore',
	constructor: function (config) {
		config = Ext.apply({
			model: 'somnus.model.statistical.AppStatModel',
			readUrl: 'json/stat/queryAppStat.json',
			baseUrl: 'stat'
		}, config);
		this.callParent([config]);
	}
});
