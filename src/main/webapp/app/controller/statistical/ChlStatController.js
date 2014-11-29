Ext.define('somnus.controller.statistical.ChlStatController', {
	extend: 'somnus.common.base.BaseController',
	stores: ['statistical.ChlStatStore'],
	models: ['statistical.ChlStatModel'],
	views: ['statistical.chlStat.ChlStatList'],
	refs: [
	       {ref: 'chlStatList', selector: 'chlStatList'}
	],
	init: function () {
		this.control({
			'chlStatList button[action=queryChlStat]': {
				click: this.queryChlStat
			}
		});
	},
	queryChlStat: function () {
		var daterange = this.getChlStatList().down('#daterange');
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
		var store = this.getChlStatList().getStore();
		Ext.apply(store.getProxy().extraParams, {
			startDate: startDate,
			endDate: endDate
		});
		store.loadPage(1);
	}
});