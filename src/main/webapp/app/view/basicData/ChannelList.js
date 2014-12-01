Ext.define('somnus.view.basicData.channel.ChannelList', {
    extend: 'somnus.common.base.BaseGrid',
    alias: 'widget.channelList',
    title: '通道管理',
    frame: true,
    initComponent: function () {
        Ext.apply(this, {
            width: 680,
            height: 350,
            store: 'basicData.ChannelStore',
            autoQuery: true,
            multiSelect: true,
            selModel: {
                selType: 'checkboxmodel'
            },
            columns: [
                {
                    header: '通道名称',
                    dataIndex: 'channelname',
                    width: 150 ,
                    flex: 1
                },
                {
                    header: '预警金额',
                    dataIndex: 'alertbalance',
                    width: 150
                },
                {
                    header: 'beanId',
                    dataIndex: 'beanId',
                    width: 150
                }
			
            ],
            tbar: [
				'通道名称',
                {
                    itemId: 'channelName',
                    xtype: 'textfield',
                    width: 140,
                    emptyText: '请输入通道名称'
                },
                {
                    text: '搜索',
                    iconCls: 'icon-query',
                    scope: this,
                    action: 'query'
                },
                {
                    text: '添加',
                    scope: this,
                    action: 'add'
                },
                {
                    text: '编辑',
                    scope: this,
                    action: 'update'
                },
                {
                    text: '删除',
                    scope: this,
                    action: 'remove'
                },
                {
                	text: '余额查询',
                    scope: this,
                    action: 'quertbalance'
                }
            ]
        });
        this.callParent(arguments);
    }
})
