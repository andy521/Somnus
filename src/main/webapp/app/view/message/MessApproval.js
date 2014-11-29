Ext.define('somnus.view.message.MessApproval', {
	extend: 'somnus.common.base.BaseFormNoSave',
	alias: 'widget.messApprovalWindow',
	title: '详细信息',
	baseUrl: 'messApproval',
	initComponent: function () {
		this.formPanel = Ext.create('Ext.form.Panel', {
			bodyStyle: 'padding: 5px 10px',
			border: false,
			baseCls: 'x-plain',
			defaultType: 'textfield',
			defaults: {
				labelWidth: 105,
				anchor: '100%',
				readOnly: true
			},
			items: [{
				fieldLabel: '对方号码',
				name: 'phoneNo',
				width: 200
			},{
				fieldLabel: '我方号码',
				name: 'ourPhoneNo',
				width: 200
			},{
				xtype:"combo",
				fieldLabel: '接收/发送类型',
				name: 'rsType',
				width: 200,
				mode:"local",
				triggerAction:"all",
				store:[['1','接收'],['2','发送']]
			},{
				fieldLabel: '短信内容',
				name: 'content',
				width: 200
			},{
				fieldLabel: '落地时间',
				name: 'pushTime',
				width: 200
			},{
				fieldLabel: '接收/发送时间',
				name: 'rsTime',
				width: 200
			},{
				fieldLabel: '通道',
				name: 'channelName',
				width: 200
			},{
				fieldLabel: '应用平台',
				name: 'appName',
				width: 200
			},{
				xtype:"combo",
				fieldLabel: '接收短信类型',
				name: 'recType',
				width: 200,
				mode:"local",
				triggerAction:"all",
				store:[['1','指令'],['2','密码']]
			},{
				xtype:"combo",
				fieldLabel: '通知状态',
				name: 'notifyStatus',
				width: 200,
				mode:"local",
				triggerAction:"all",
				store:[['1','未通知'],['2','已通知'],['3','无效']]
			},{
				xtype:"combo",
				fieldLabel: '发送状态',
				name: 'sendStatus',
				width: 200,
				mode:"local",
				triggerAction:"all",
				store:[
				       ['1','待处理'],['2','待审核'],['3','审核拒绝'],['4','待发送'],['5','已发送'],['6','发送失败'],['7','发送成功']
				]
			},{
				xtype:"combo",
				fieldLabel: '是否需要回执',
				name: 'callback',
				width: 200,
				mode:"local",
				triggerAction:"all",
				store:[
				       ['0','否'],['1','是']
				]
			},{
				fieldLabel: '模版',
				name: 'templateName',
				width: 200
			},{
				fieldLabel: '发送失败次数',
				name: 'failCount',
				width: 200
			},{
				fieldLabel: '发送失败原因',
				name: 'failReason',
				width: 200
			},{
				fieldLabel: '应用平台短信ID',
				name: 'appMsgId',
				width: 200
			},{
				fieldLabel: '通道短信ID',
				name: 'channelMsgId',
				width: 200
			}]
		});
		this.items = [this.formPanel];
		this.callParent();
	}
});
