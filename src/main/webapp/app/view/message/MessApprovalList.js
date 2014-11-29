Ext.define('somnus.view.message.MessApprovalList', {
	extend: 'somnus.common.base.BaseGrid',
	alias: 'widget.messApprovalList',
	title: '短信审核',
	frame: true,
	autoQuery: false,
	initComponent: function () {
		Ext.apply(this, {
			width: 680,
			height: 350,
			store: 'message.MessApprovalStore',
			multiSelect: true,
			autoQuery: false,
			selModel: {
				selType: 'checkboxmodel'
			},
			forceFit: true,
			columns: [{
				header: '应用平台',
				dataIndex: 'appName',
				width: 200
			},{
				header: '对方号码',
				dataIndex: 'phoneNo',
				width: 200
			},{
				header: '短信内容',
				dataIndex: 'content',
				width: 200,
				renderer: function (value, metaData, data) {
					var cname = value;
					if (value.length > 10) {
						metaData.tdAttr = 'data-qtip="' + value + '"';
						cname = value.substring(0, 10) + "...";
					}
					return cname;
				}
			},{
				header: '落地时间',
				dataIndex: 'pushTime',
				width: 245
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
				        }]
			},{
				xtype: 'toolbar',
				dock: 'top',
				border: false,
				items: [
				        '模版ID',
				        {
				        	itemId: 'templateId',
				        	xtype: 'textfield',
				        	width: 120,
				        	emptyText: '请输入模版ID'
				        },
				        '起止日期',
				        {
				        	itemId: 'daterange',
				        	xtype: 'daterange',
				        	range: '-1d'
				        }, {
				        	text: '搜索',
				        	iconCls: 'icon-query',
				        	scope: this,
				        	action: 'query'
				        },{
				        	text: '详细',
				        	iconCls: 'icon-query',
				        	scope: this,
				        	action: 'show'
				        },{
				        	text: '审核通过',
				        	iconCls: 'icon-query',
				        	scope: this,
				        	action: 'success'
				        },{
				        	text: '审核拒绝',
				        	iconCls: 'icon-query',
				        	scope: this,
				        	action: 'failed'
				        }]
			}]
		});
		this.callParent(arguments);
	}
});
