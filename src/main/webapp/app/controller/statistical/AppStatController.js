Ext.define('somnus.controller.statistical.AppStatController', {
	extend: 'somnus.common.base.BaseController',
	stores: ['statistical.AppStatStore'],
	models: ['statistical.AppStatModel'],
	views: ['statistical.appStat.AppStatList'],
	refs: [
	       {ref: 'appStatList', selector: 'appStatList'}
	],
	init: function () {
		this.control({
			'appStatList button[action=queryAppStat]': {
				click: this.queryAppStat
			}
		});
	},
	queryAppStat: function () {
		var daterange = this.getAppStatList().down('#daterange');
		var startDate = daterange.getStartDate();
		var endDate = daterange.getEndDate();
		if (fixDate(startDate) - fixDate(endDate) > 0) {
			Ext.Msg.show({
				title: '信息',
				msg: '开始时间大于结束时间！',
				icon: Ext.Msg.INFO
			});
			return;
		}
		if (fixDate(endDate) - fixDate(startDate) > 31536000000) {
			Ext.Msg.show({
				title: '信息',
				msg: '日期范围超过1年！',
				icon: Ext.Msg.INFO
			});
			return;
		}
		var store = this.getAppStatList().getStore();
		Ext.apply(store.getProxy().extraParams, {
			startDate: startDate,
			endDate: endDate
		});
		store.loadPage(1);
	}
});