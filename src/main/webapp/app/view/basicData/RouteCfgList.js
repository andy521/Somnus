Ext.define('somnus.view.basicData.routeCfg.RouteCfgList', {
    extend: 'somnus.common.base.BaseGrid',
    alias: 'widget.routeCfgList',
    title: '短信通道路由',
    frame: true,
    initComponent: function () {
        Ext.apply(this, {
            width: 680,
            height: 350,
            store: 'basicData.RouteCfgStore',
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
                    header: '优先级',
                    dataIndex: 'priority',
                    width: 100
                },
                {
                    header: '短信通道',
                    dataIndex: 'channelName',
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
                    itemId: 'appId',
                    xtype: 'basecombo',
                    entityName: 'App',
                    showAll: true,
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
                    itemId: 'templateId',
                    xtype: 'basecombo',
                    entityName: 'Template',
                    showAll: true
                },
                '短信通道:',
                {
                    itemId: 'channelId',
                    xtype: 'basecombo',
                    entityName: 'Channel',
                    showAll: true
                },
                {
                    text: '搜索',
                    iconCls: 'icon-query',
                    scope: this,
                    action: 'queryRouteCfg'
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
