Ext.define('somnus.view.system.user.UserList', {
    extend: 'somnus.common.base.BaseGrid',
    alias: 'widget.userList',
    title: '操作员',
    frame: true,
    initComponent: function () {
        Ext.apply(this, {
            width: 680,
            height: 350,
            store: 'system.UserStore',
            multiSelect: true,
            selModel: {
                selType: 'checkboxmodel'
            },
            columns: [
                {
                    header: '姓名',
                    dataIndex: 'userName',
                    width: 200,
                    flex: 1
                },
                {
                    header: '登陆名',
                    dataIndex: 'loginName',
                    width: 200
                }
            ],
            tbar: [
                '姓名',
                {
                    itemId: 'userName',
                    xtype: 'textfield',
                    width: 140,
                    emptyText: '请输入姓名'
                },
                '登陆名',
                {
                    itemId: 'loginName',
                    xtype: 'textfield',
                    width: 140,
                    emptyText: '请输入登录名称'
                },
                {
                    text: '搜索',
                    iconCls: 'icon-query',
                    scope: this,
                    action: 'queryUser'
                },
                {
                    text: '添加',
                    scope: this,
                    action: 'create'
                },
                {
                    text: '编辑',
                    scope: this,
                    action: 'update'
                },
                {
                    text: '删除',
                    scope: this,
                    action: 'delete'
                },
                {
                    text: '重设密码',
                    scope: this,
                    action: 'resetPwd'
                }
            ]
        });
        this.callParent(arguments);
    }

})
