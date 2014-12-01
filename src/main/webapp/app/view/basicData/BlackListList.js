Ext.define('somnus.view.basicData.blackList.BlackListList', {
    extend: 'somnus.common.base.BaseGrid',
    alias: 'widget.blackListList',
    title: '黑名单',
    frame: true,
    initComponent: function () {
        Ext.apply(this, {
            width: 680,
            height: 350,
            store: 'basicData.BlackListStore',
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
                    action: 'queryBlackList'
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
