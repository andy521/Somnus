Ext.define('somnus.view.basicData.template.TemplateList', {
    extend: 'somnus.common.base.BaseGrid',
    alias: 'widget.templateList',
    title: '短信模板',
    frame: true,
    initComponent: function () {
        Ext.apply(this, {
            width: 680,
            height: 350,
            store: 'basicData.TemplateStore',
//            autoQuery:false,
            multiSelect: true,
            selModel: {
                selType: 'checkboxmodel'
            },
            columns: [
                {
                    header: '模板ID',
                    dataIndex: 'templateId',
                    width: 100
                },
                {
                    header: '模板名称',
                    dataIndex: 'templateName',
                    width: 100
                },
                {
                    header: '模板内容',
                    dataIndex: 'content',
                    width: 100,
                    flex: 1
                },
                {
                    header: '应用平台',
                    dataIndex: 'appName',
                    width: 100
                },
                {
                    header: '优先级',
                    dataIndex: 'priority',
                    align: 'center',
                    width: 60
                },
                {
                    header: '备注',
                    dataIndex: 'remark',
                    width: 100
                }
            ],
            tbar: [
                '应用平台',
                {
                    itemId: 'appId',
                    xtype: 'basecombo',
                    entityName: 'App',
                    showAll: true
                },
                '模板ID',
                {
                    itemId: 'templateId',
                    xtype: 'textfield',
                    regex: /^\d+$/,
                    regexText: "只能输入数字!",
                    width: 140,
                    emptyText: '请输入模板ID'
                },
                '模板名称',
                {
                    itemId: 'templateName',
                    xtype: 'textfield',
                    width: 140,
                    emptyText: '请输入模板名称'
                },
                {
                    text: '搜索',
                    iconCls: 'icon-query',
                    scope: this,
                    action: 'queryTemplate'
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
