Ext.define('somnus.controller.message.MessApprovalController', {
	extend: 'somnus.common.base.BaseController',
	stores: ['message.MessApprovalStore'],
	models: ['message.MessApprovalModel'],
	views: ['message.MessApprovalList', 'message.MessApproval'],
	refs: [
	       {ref: 'messApprovalList', selector: 'messApprovalList'},
	       {ref: 'messApprovalWindow', selector: 'messApprovalWindow', xtype: 'messApprovalWindow'}
	],
	init: function () {
		this.control({
			'messApprovalList button[action=query]': {
				click: this.queryMessApproval
			},
			'messApprovalList': {
				afterrender: this.queryMessApproval
			},
			'messApprovalList button[action=show]': {
				click: this.showMessApproval
			},
			'messApprovalList button[action=success]': {
				click: this.approvalSuccess
			},
			'messApprovalList button[action=failed]': {
				click: this.approvalFailed
			}
		});
	},
	queryMessApproval: function () {
		var dateRange = this.getMessApprovalList().down('#daterange');
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
		if((fixDate(endDate) - fixDate(startDate))/ (24 * 60 * 60 * 1000) > 30){
			Ext.Msg.show({
				title: '信息',
				msg: '时间跨度不能超过一个月！',
				icon: Ext.Msg.INFO
			});
			return;
		}
		var appMsgId = this.getMessApprovalList().down('#appMsgId').getValue();
		var phoneNo = this.getMessApprovalList().down('#phoneNo').getValue();
		var appId = this.getMessApprovalList().down('#appId').getValue();
		var templateId = this.getMessApprovalList().down('#templateId').getValue();
		var store = this.getMessApprovalList().getStore();
		if (!Ext.isEmpty(appMsgId)) {
			phoneNo = "";
			appId = "";
			startDate = "";
			templateId = "";
			endDate = "";
		}
		Ext.apply(store.getProxy().extraParams, {
			appMsgId: appMsgId,
			phoneNo: phoneNo,
			'templateEntity.templateId': templateId,
			'appEntity.appId': appId,
			startDate: startDate,
			endDate: endDate
		});
		store.loadPage(1);
	},
	showMessApproval: function () {
		var records = this.getMessApprovalList().getSelectionModel().getSelection();
		if (records.length != 1) {
			Ext.Msg.alert("提示", "只能选择一条记录进行查询");
			return;
		}
		var msgId = this.getMessApprovalList().getSelectionModel().getLastSelected().get('msgId');
		Ext.create('somnus.view.message.MessApproval', {
			pk: msgId
		}).show();
	},
	approvalSuccess: function () {
		var records = this.getMessApprovalList().getSelectionModel().getSelection();
		//if (records.length != 1) {
		// Ext.Msg.alert("提示", "只能选择一条记录进行审核");
		// return;
		//}
		var msgIds = [];
		Ext.Array.each(records, function (record) {
			msgIds.push(record.get("msgId"));
		});
		var me = this;
		if(msgIds.length>0){
			Ext.Ajax.request({
				url: app.contextPath + '/messApproval/success',
				method: 'POST',
				params: {
					msgId: msgIds
				},
				success: function (response) {
					var results = Ext.decode(response.responseText);
					if (results.success) {
						Ext.Msg.show({
							title: '信息',
							msg: '审核成功！',
							buttons: Ext.Msg.OK,
							icon: Ext.Msg.INFO
						});
						me.queryApproval();
					}
					else
					{
						Ext.Msg.show({
							title: '信息',
							msg: '所选记录审核失败！',
							buttons: Ext.Msg.OK,
							icon: Ext.Msg.INFO
						});
						me.queryApproval();
					}
				}
			});
		}
		else
		{
			Ext.Msg.alert("提示", "请选择一条记录进行审核");
			return;
		}
	},
	approvalFailed: function () {
		var records = this.getMessApprovalList().getSelectionModel().getSelection();
		//if (records.length != 1) {
		// Ext.Msg.alert("提示", "只能选择一条记录进行审核");
		// return;
		//}
		var msgIds = [];
		Ext.Array.each(records, function (record) {
			msgIds.push(record.get("msgId"));
		});
		if(msgIds.length>0){
			Ext.create('somnus.view.message.MessApprovalReason', {
				msgId: msgIds,
				listeners: {
					success: function () {
						this.getMessApprovalList().getStore().load();
					},
					scope: this
				}
			}).show();
		}
		else
		{
			Ext.Msg.alert("提示", "请选择一条记录进行审核");
			return;
		}
	},
	queryApproval: function () {
		this.getMessApprovalList().getStore().loadPage(1);
	}
});