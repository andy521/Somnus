Ext.define('somnus.view.basicData.alertContact.AlertContactList', {
    extend: 'somnus.common.base.BaseGrid',
    alias: 'widget.alertContactList',
    title: '余额预警',
    frame: true,
    initComponent: function () {
        Ext.apply(this, {
            width: 680,
            height: 350,
            store: 'basicData.AlertContactStore',
//            autoQuery:false,
            multiSelect: true,
            selModel: {
                selType: 'checkboxmodel'
            },
            columns: [
                {
                    header: '手机号',
                    dataIndex: 'phoneNo',
                    width: 100
                },
                {
                    header: '备注',
                    dataIndex: 'remark',
                    width: 100,
                    flex: 1
                }
            ],
            tbar: [
                '手机号:',
                {
                    itemId: 'phoneNo',
                    xtype: 'textfield',
                    vtype: 'mobilephone',
                    width: 140,
                    emptyText: '请输入手机号'
                },
                {
                    text: '搜索',
                    iconCls: 'icon-query',
                    scope: this,
                    action: 'queryAlertContact'
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
