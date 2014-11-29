Ext.define('somnus.view.statistical.appStat.AppStatList', {
	extend: 'somnus.common.base.BaseGrid',
	alias: 'widget.appStatList',
	title: '平台统计',
	frame: true,
	width: 680,
	height: 350,
	autoQuery: false,
	store: 'statistical.AppStatStore',
	multiSelect: true,
	enablePagginBar: false,
	selModel: {
		selType: 'checkboxmodel'
	},
	features: [{
		ftype: 'summary'
	}],
	columns: [{
		header: '应用平台',
		dataIndex: 'appName',
		width: 200,
		flex: 1,
		summaryType: 'sum',
		summaryRenderer: function (value, summaryData, dataIndex) {
			return '总计';
		}
	},{
		header: '接收短信笔数',
		dataIndex: 'recvCount',
		width: 200,
		summaryType: 'sum',
		summaryRenderer: function (value, summaryData, dataIndex) {
			return value;
		}
	},{
		header: '发送短信笔数',
		dataIndex: 'sendCount',
		width: 200,
		summaryType: 'sum',
		summaryRenderer: function (value, summaryData, dataIndex) {
			return value;
		}
	} ,{
		header: '合计',
		dataIndex: 'sumCount',
		width: 200,
		summaryType: 'sum',
		summaryRenderer: function (value, summaryData, dataIndex) {
			return value;
		}
	}],
	tbar: [
	'起止日期',
	{
		itemId: 'daterange',
		xtype: 'daterange',
		range: '-1d'
	},{
		text: '搜索',
		iconCls: 'icon-query',
		scope: this,
		action: 'queryAppStat'
	}],
	initComponent: function () {
		this.callParent(arguments);
	}
})
