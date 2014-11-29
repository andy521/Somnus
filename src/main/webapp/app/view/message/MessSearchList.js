Ext.define('somnus.view.message.MessSearchList', {
	extend: 'somnus.common.base.BaseGrid',
	alias: 'widget.messSearchList',
	title: '短信查询',
	frame: true,
	autoQuery: false,
	initComponent: function () {
		Ext.apply(this, {
			width: 680,
			height: 350,
			store: 'message.MessSearchStore',
			multiSelect: true,
			autoQuery: false,
			selModel: {
				selType: 'checkboxmodel'
			},
			forceFit: true,
			columns: [{
				header: '对方号码',
				dataIndex: 'phoneNo',
				width: 120,
				locked: true
			},{
				header: '短信内容',
				dataIndex: 'content',
				width: 180,
				locked: true,
				renderer: function (value, metaData, data) {
					var cname = value;
					if (value.length > 10) {
						metaData.tdAttr = 'data-qtip="' + value + '"';
						cname = value.substring(0, 10) + "...";
					}
					return cname;
				}
			},{
				header: '通道',
				dataIndex: 'channelName',
				width: 120
			},{
				header: '应用平台',
				dataIndex: 'appName',
				width: 120
			},{
				header: '通知状态',
				dataIndex: 'notifyStatus',
				width: 80,
				renderer: function (value) {
					var result = '';
					switch (value) {
					case '1' :
						result = '未通知';
						break;
					case '2' :
						result = '已通知';
						break;
					case '3' :
						result = '无效';
						break;
					}
					return result;
				}
			},{
				header: '发送状态',
				dataIndex: 'sendStatus',
				width: 80,
				renderer: function (value) {
					var result = '';
					switch (value) {
					case '1' :
						result = '待处理';
						break;
					case '2' :
						result = '待审核';
						break;
					case '3' :
						result = '审核拒绝';
						break;
					case '4' :
						result = '待发送';
						break;
					case '5' :
						result = '已发送';
						break;
					case '6' :
						result = '发送失败';
						break;
					case '7' :
						result = '发送成功';
						break;
					}
					return result;
				}
			},{
				header: '发送失败次数',
				dataIndex: 'failCount',
				width: 100
			},{
				header: '类型',
				dataIndex: 'rsType',
				width: 60,
				renderer: function (value) {
					var result = '';
					switch (value) {
					case '1' :
						result = '接收';
						break;
					case '2' :
						result = '发送';
						break;
					}
					return result;
				}
			},{
				header: '落地时间',
				dataIndex: 'pushTime',
				width: 140
			},{
				header: '接收/发送时间',
				dataIndex: 'rsTime',
				width: 140
			}],
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				border: false,
				items: [
				        '对方号码',
				        {
				        	itemId: 'phoneNo',
				        	xtype: 'textfield',
				        	vtype: 'mobilephone',
				        	width: 120,
				        	emptyText: '请输入手机号'
				        },
				        '应用平台',
				        {
				        	itemId: 'appId',
				        	xtype: 'basecombo',
				        	width: 120,
				        	entityName: 'App',
				        	showAll: true
				        },
				        '应用平台短信ID',
				        {
				        	itemId: 'appMsgId',
				        	width: 140,
				        	xtype: 'textfield',
				        	emptyText: '请输入短信ID'
				        } ]
			},{
				xtype: 'toolbar',
				dock: 'top',
				border: false,
				items: [
				        '通知状态',
				        {
				        	itemId: 'notifyStatus',
				        	xtype: "combo",
				        	width: 120,
				        	mode: "local",
				        	triggerAction: "all",
				        	value: '',
				        	store: [
				        	        ['', '全部'],
				        	        ['1', '未通知'],
				        	        ['2', '已通知'],
				        	        ['3', '无效']
				        	 ]
				        },
				        '发送状态',
				        {
				        	itemId: 'sendStatus',
				        	xtype: "combo",
				        	name: 'sendStatus',
				        	width: 120,
				        	mode: "local",
				        	value: '',
				        	triggerAction: "all",
				        	store: [
				        	        ['', '全部'],
				        	        ['1', '待处理'],
				        	        ['2', '待审核'],
				        	        ['3', '审核拒绝'],
				        	        ['4', '待发送'],
				        	        ['5', '已发送'],
				        	        ['6', '发送失败'],
				        	        ['7', '发送成功']
				        	 ]
				        },
				        '起止日期',
				        {
				        	itemId: 'daterange',
				        	xtype: 'daterange',
				        	range: '-1d'
				        },{
				        	text: '搜索',
				        	iconCls: 'icon-query',
				        	scope: this,
				        	action: 'query'
				        }, {
				        	text: '详细',
				        	iconCls: 'icon-query',
				        	scope: this,
				        	action: 'show'
				        }]
				}]
		});
		this.callParent(arguments);
	}
});
