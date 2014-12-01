Ext.define('somnus.view.basicData.cmd.CmdList', {
    extend: 'somnus.common.base.BaseGrid',
    alias: 'widget.cmdList',
    title: '指令类型',
    frame: true,
    initComponent: function () {
        Ext.apply(this, {
            width: 680,
            height: 350,
            store: 'basicData.CmdStore',
//            autoQuery:false,
            multiSelect: true,
            selModel: {
                selType: 'checkboxmodel'
            },
            columns: [
                {
                    header: '指令类型名称',
                    dataIndex: 'cmdName',
                    width: 100,
                    flex: 1
                },
                {
                    header: '指令类型编码',
                    dataIndex: 'cmdCode',
                    width: 100
                },
                {
                    header: '指令类型参数',
                    dataIndex: 'arguments',
                    width: 100
                },
                {
                    header: '解析参数正则表达式',
                    dataIndex: 'reguler',
                    width: 200
                },
                {
                    header: '应用平台',
                    dataIndex: 'appName',
                    width: 200
                },
                {
                    header: '备注',
                    dataIndex: 'remark',
                    width: 100
                }
            ],
            tbar: [
                '应用平台:',
                {
                    itemId: 'appId',
                    xtype: 'basecombo',
                    entityName: 'App',
                    showAll: true
                },
                '指令类型名称:',
                {
                    itemId: 'cmdName',
                    xtype: 'textfield',
                    width: 140,
                    emptyText: '请输入指令类型名称'
                },
                '指令类型编码:',
                {
                    itemId: 'cmdCode',
                    xtype: 'textfield',
                    width: 140,
                    emptyText: '请输入指令类型编码'
                },
                {
                    text: '搜索',
                    iconCls: 'icon-query',
                    scope: this,
                    action: 'queryCmd'
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
