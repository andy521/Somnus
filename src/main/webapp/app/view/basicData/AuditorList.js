Ext.define('somnus.view.basicData.auditor.AuditorList', {
    extend: 'somnus.common.base.BaseGrid',
    alias: 'widget.auditorList',
    title: '短信审核人员管理',
    frame: true,
    initComponent: function () {
        Ext.apply(this, {
            width: 680,
            height: 350,
            store: 'basicData.AuditorStore',
//            autoQuery:false,
            multiSelect: true,
            selModel: {
                selType: 'checkboxmodel'
            },
            columns: [
                {
                    header: '应用平台',
                    dataIndex: 'appName',
                    width: 100
                },
                {
                    header: '短信模板',
                    dataIndex: 'templateName',
                    width: 100
                },
                {
                    header: '审核员登录名',
                    dataIndex: 'loginName',
                    width: 100
                },
                {
                    header: '审核员姓名',
                    dataIndex: 'userName',
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
                '应用平台:',
                {
                    xtype: 'basecombo',
                    entityName: 'App',
                    showAll: true,
                    itemId: 'appId',
                    listeners: {
                        change: function (combo, record, index) {
                            var templateCombo = this.next().next();
                            templateCombo.clearValue();

                            var templateComboStore = templateCombo.store;

                            Ext.apply(templateComboStore.getProxy().extraParams, {
                                paramName: 'appId',
                                paramValue: this.value
                            });

                            templateComboStore.load();
                        }
                    }
                },
                '短信模板:',
                {
                    xtype: 'basecombo',
                    entityName: 'Template',
                    showAll: true,
                    itemId: 'templateId'
                },
                '审核员姓名:',
                {
                    itemId: 'auditorName',
                    xtype: 'textfield',
                    width: 100,
                    emptyText: '请输入审核员姓名'
                },
                '审核员登录名:',
                {
                    itemId: 'auditorLoginName',
                    xtype: 'textfield',
                    width: 100,
                    emptyText: '请输入审核员登录名'
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
