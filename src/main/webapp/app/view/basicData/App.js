Ext.define('somnus.view.basicData.app.App', {
    extend: 'somnus.common.base.BaseForm',
    alias: 'widget.appWindow',
    title: '平台信息',
    baseUrl: 'app',
    initComponent: function () {

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyStyle: 'padding: 5px 10px',
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 60,
                anchor: '100%'
            },
            trackResetOnLoad: true,
            items: [
                {
                    fieldLabel: '名称',
                    name: 'appName',
                    vtype: 'unique',
                    vtypeEntity: 'App',
                    allowBlank: false
                },
                {
                    fieldLabel: '代码',
                    name: 'appCode',
                    vtype: 'unique',
                    vtypeEntity: 'App',
                    maxLength: 8,
                    allowBlank: false
                },
                {
                    fieldLabel: '通知地址',
                    name: 'notifyAdd',
                    allowBlank: false
                },
                {
                    fieldLabel: '备注',
                    name: 'remark'
                },
//                {
//                    fieldLabel: '状态',
//                    xtype: 'numberfield',
//                    name: 'status'
//                },
                {
                    xtype: 'hidden',
                    name: 'appId'
                }
            ]
        });

        this.items = [this.formPanel];

        this.callParent();
    }
});
