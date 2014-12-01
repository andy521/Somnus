Ext.define('somnus.view.basicData.cmd.Cmd', {
    extend: 'somnus.common.base.BaseForm',
    alias: 'widget.cmdWindow',
    title: '指令类型',
    baseUrl: 'cmd',
    initComponent: function () {

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyStyle: 'padding: 5px 10px',
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 140,
                anchor: '100%'
            },
            trackResetOnLoad: true,
            items: [
                {
                    fieldLabel: '指令类型名称',
                    name: 'cmdName',
                    allowBlank: false
                },
                {
                    fieldLabel: '指令类型代码',
                    name: 'cmdCode',
                    maxLength: 4,
                    minLength: 4,
                    vtype: 'alphaAndUnique',
                    vtypeEntity: 'Cmd',
                    allowBlank: false
                },
                {
                    fieldLabel: '指令类型参数',
                    name: 'arguments',
                    regex: /^[A-Za-z0-9]*([,]*[A-Za-z0-9])*$/,
                    regexText: '参数必须为字母数字，多参数以,分割'
                },
                {
                    fieldLabel: '解析参数正则表达式',
                    name: 'reguler',
                    validator: function () {
                        if (!Ext.isEmpty(this.prev().getValue()) && Ext.isEmpty(this.getValue())) {
                            return "解析参数正则表达式不能为空";
                        }
                        return true;
                    }
                },
                {
                    fieldLabel: '应用平台',
                    xtype: 'basecombo',
                    entityName: 'App',
                    name: 'appEntity.appId',
                    allowBlank: false
                },
                {
                    fieldLabel: '备注',
                    name: 'remark'
                },
                {
                    xtype: 'hidden',
                    name: 'cmdId'
                }
            ]
        });

        this.items = [this.formPanel];

        this.callParent();
    }
});
