Ext.define('somnus.view.statistical.chlStat.ChlStatList', {
	extend: 'somnus.common.base.BaseGrid',
	alias: 'widget.chlStatList',
	title: '通道统计',
	frame: true,
	width: 680,
	height: 350,
	autoQuery: false,
	store: 'statistical.ChlStatStore',
	enablePagginBar: false,
	multiSelect: true,
	selModel: {
		selType: 'checkboxmodel'
	},
	features: [{
		ftype: 'summary'
	}
	],
	forceFit: true,
	columns: [{
		header: '通道',
		dataIndex: 'channelName',
		width: 200,
		summaryType: 'sum',
		summaryRenderer: function (value, summaryData, dataIndex) {
			return '总计';
		}
	},{
		header: '接收有效短信笔数',
		dataIndex: 'vldRecvCount',
		width: 200,
		summaryType: 'sum',
		summaryRenderer: function (value, summaryData, dataIndex) {
			return value;
		}
	},{
		header: '接收无效短信笔数',
		dataIndex: 'invldRecvCount',
		width: 200,
		summaryType: 'sum',
		summaryRenderer: function (value, summaryData, dataIndex) {
			return value;
		}
	},{
		header: '接收短信总数',
		dataIndex: 'recvCount',
		width: 200,
		summaryType: 'sum',
		summaryRenderer: function (value, summaryData, dataIndex) {
			return value;
		}
	},{
		header: '接收短信无效率',
		dataIndex: 'invldRecvPer',
		width: 200,
		summaryType: 'sum',
		summaryRenderer: function (value, summaryData, dataIndex) {
			var result = (dataIndex.data.invldRecvCount * 100 / dataIndex.data.recvCount).toFixed(2);
			if (Ext.isNumeric(result)) {
				result = result + '%';
			} else {
				result = 0
			}
			return result;
		}
	},{
		header: '发送成功笔数',
		dataIndex: 'sendSuccCount',
		width: 200,
		summaryType: 'sum',
		summaryRenderer: function (value, summaryData, dataIndex) {
			return value;
		}
	},{
		header: '发送失败笔数',
		dataIndex: 'sendFailCount',
		width: 200,
		summaryType: 'sum',
		summaryRenderer: function (value, summaryData, dataIndex) {
			return value;
		}
	},{
		header: '发送短信总数',
		dataIndex: 'sumCount',
		width: 200,
		summaryType: 'sum',
		summaryRenderer: function (value, summaryData, dataIndex) {
			return value;
		}
	},{
		header: '发送短信失败率',
		dataIndex: 'sendFailPer',
		width: 200,
		summaryType: 'sum',
		summaryRenderer: function (value, summaryData, dataIndex) {
			var result = (dataIndex.data.sendFailCount * 100 / dataIndex.data.sumCount).toFixed(2);
			if (Ext.isNumeric(result)) {
				result = result + '%';
			} else {
				result = 0
			}
			return result;
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
	    	   action: 'queryChlStat'
	       }],
	initComponent: function () {
		this.callParent(arguments);
	}
})
