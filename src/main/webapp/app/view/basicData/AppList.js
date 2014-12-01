Ext.define('somnus.view.basicData.app.AppList', {
    extend: 'somnus.common.base.BaseGrid',
    alias: 'widget.appList',
    title: '应用平台',
    frame: true,
    initComponent: function () {
        Ext.apply(this, {
            width: 680,
            height: 350,
            store: 'basicData.AppStore',
            autoQuery: true,
            multiSelect: true,
            selModel: {
                selType: 'checkboxmodel'
            },
            columns: [
//                {
//                    header: '应用平台Id',
//                    dataIndex: 'appId',
//                    width: 150
//                },
                {
                    header: '应用平台名称',
                    dataIndex: 'appName',
                    width: 200
                },
                {
                    header: '应用平台编码',
                    dataIndex: 'appCode',
                    width: 150
                },
                {
                    header: '通知地址',
                    dataIndex: 'notifyAdd',
                    width: 200,
                    flex: 1
                },
                {
                    header: '备注',
                    dataIndex: 'remark',
                    width: 200
                }
            ],
            tbar: [
                '应用平台编码',
                {
                    itemId: 'appCode',
                    xtype: 'textfield',
                    width: 140,
                    emptyText: '请输入应用平台编码'
                },
                '应用平台名称',
                {
                    itemId: 'appName',
                    xtype: 'textfield',
                    width: 140,
                    emptyText: '请输入应用平台名称'
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
                }
            ]
        });
        this.callParent(arguments);
    }
})
