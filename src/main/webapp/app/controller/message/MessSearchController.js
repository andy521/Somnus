Ext.define('somnus.controller.message.MessSearchController', {
	extend: 'somnus.common.base.BaseController',
	stores: ['message.MessSearchStore'],
	models: ['message.MessSearchModel'],
	views: ['message.MessSearchList', 'message.MessSearch'],
	refs: [
	{ref: 'messSearchList', selector: 'messSearchList'},
	{ref: 'messSearchWindow', selector: 'messSearchWindow', xtype: 'messSearchWindow'}
	],
	init: function () {
		this.control({
			'messSearchList button[action=query]': {
				click: this.queryMessSearch
			},
			'messSearchList': {
				afterrender: this.queryMessSearch
			},
			'messSearchList button[action=show]': {
				click: this.showMessage
			}
		});
	},
	queryMessSearch: function () {
		var dateRange = this.getMessSearchList().down('#daterange');
		var startDate = dateRange.getStartDate();
		var endDate = dateRange.getEndDate();
		if (startDate > endDate) {
			Ext.Msg.show({
				title: '信息',
				msg: '开始时间大于结束时间！',
				icon: Ext.Msg.INFO
			});
			return;
		}
		if ((fixDate(endDate) - fixDate(startDate)) / (24 * 60 * 60 * 1000) > 30) {
			Ext.Msg.show({
				title: '信息',
				msg: '时间跨度不能超过一个月！',
				icon: Ext.Msg.INFO
			});
			return;
		}
		var appMsgId = this.getMessSearchList().down('#appMsgId').getValue();
		var phoneNo = this.getMessSearchList().down('#phoneNo').getValue();
		var appId = this.getMessSearchList().down('#appId').getValue();
		var sendStatus = this.getMessSearchList().down('#sendStatus').getValue();
		var notifyStatus = this.getMessSearchList().down('#notifyStatus').getValue();
		if (!Ext.isEmpty(appMsgId)) {
			phoneNo = "";
			appId = "";
			sendStatus = "";
			notifyStatus = "";
			startDate = "";
			endDate = "";
		}
		var store = this.getMessSearchList().getStore();
		Ext.apply(store.getProxy().extraParams, {
			appMsgId: appMsgId,
			sendStatus: sendStatus,
			notifyStatus: notifyStatus,
			phoneNo: phoneNo,
			'appEntity.appId': appId,
			startDate: startDate,
			endDate: endDate
		});
		store.loadPage(1);
	},
	showMessage: function () {
		var records = this.getMessSearchList().getSelectionModel().getSelection();
		if (records.length != 1) {
			Ext.Msg.alert("提示", "只能选择一条记录进行查询");
			return;
		}
		var msgId = this.getMessSearchList().getSelectionModel().getLastSelected().get('msgId');
		Ext.create('somnus.view.message.MessSearch', {
			pk: msgId
		}).show();
	}
});