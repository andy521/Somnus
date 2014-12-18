Ext.define('somnus.view.monitor.OnlineView',{
	extend: 'somnus.common.base.BaseGrid',
	alias: 'widget.onlineView',
	title: '用户登陆历史监控',
	frame: true,
	autoQuery: false,
	initComponent: function () {
		Ext.apply(this, {
			iconCls:'ext-icon-chart_line',
			store: 'monitor.OnlineStore',
			multiSelect: true,
			autoQuery: true,
			selModel: {
				selType: 'checkboxmodel'
			},
			forceFit: true,
			columns:[{
				text : '登录名',
				dataIndex : 'loginname',
				width : 200
			},{
				text : 'IP地址',
				dataIndex : 'ip',
				width : 200
			},{
				text : '创建时间',
				dataIndex : 'createdatetime',
				width : 150
			},{
				text:'类别',
				dataIndex:'type',
				renderer:function(value){
					switch (value){
						case '0':
							return "<span style='color:gray;font-weight:bold;'>注销系统</span>";
						case '1':
							return "<span style='color:green;font-weight:bold;'>登录系统</span>";
					}
				}
			}],
			dockedItems:[{
				xtype : 'toolbar',
				dock : 'top',
				items:[{
					xtype:'textfield',
					name:'QUERY_t#loginname_S_LK',
					fieldLabel:'登录名',
					labelWidth : 50,
					width: 200
				},{
					xtype:'textfield',
					name:'QUERY_t#ip_S_LK',
					fieldLabel:'IP地址',
					labelWidth : 50,
					width: 200
				},{
					xtype : 'combo',
					fieldLabel : '类别',
					labelWidth : 50,
					width: 150,
					name:'QUERY_t#type_S_EQ',
					store : {
						fields:[{name:'text',type:'string'},{name:'value',type:'string'}],
						data:[{text:'登录系统',value:'1'},{text:'注销系统',value:'0'}]
					},
					valueField : 'value',
					displayField : 'text',
					queryMode : 'local',
					emptyText:'请选择'
				},'创建时间',{
					xtype: 'daterange',
					itemId: 'daterange',
					startDateName:'QUERY_t#createdatetime_D_GE',
					endDateName:'QUERY_t#createdatetime_D_LE',
		        	range: '-1d'
				},{
					xtype:'btnsearch',
					store: 'monitor.OnlineStore',
					paramName:['QUERY_t#loginname_S_LK','QUERY_t#ip_S_LK','QUERY_t#type_S_EQ','QUERY_t#createdatetime_D_GE','QUERY_t#createdatetime_D_LE'],
					text:'过滤'
				}]
			}],
		});
		this.callParent(arguments);
	}
});