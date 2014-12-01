Ext.define('somnus.view.basicData.template.Template', {
    extend: 'somnus.common.base.BaseForm',
    alias: 'widget.templateWindow',
    title: '短信模板',
    baseUrl: 'template',
    initComponent: function () {

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyStyle: 'padding: 5px 10px',
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 80,
                anchor: '100%'
            },
            trackResetOnLoad: true,
            items: [
                {
                    fieldLabel: '模板名称',
                    name: 'templateName',
                    vtype: 'unique',
                    vtypeEntity: 'Template',
                    allowBlank: false
                },
                {
                    fieldLabel: '应用平台',
                    xtype: 'basecombo',
                    entityName: 'App',
                    name: 'appEntity.appId',
                    allowBlank: false
                },
                {
                    fieldLabel: '优先级',
                    name: 'priority',
                    xtype: 'numberfield',
                    maxValue: 9,
                    minValue: 0,
                    allowDecimals: false,
                    emptyText: '优先级范围为0～9，默认为4'
                },
//                {
//                    xtype: 'radiogroup',
//                    fieldLabel: '是否审核',
//                    name: 'ischeck',
//                    allowBlank: false,
//                    items: [
//                        {boxLabel: '是', name: 'ischeck', inputValue: 1},
//                        {boxLabel: '否', name: 'ischeck', inputValue: 0, checked: true}
//                    ]
//                },
                {
                    fieldLabel: '备注',
                    name: 'remark'
                },
                {
                    fieldLabel: '模板内容',
                    name: 'content',
                    height: 120,
                    xtype: 'textareafield',
                    maxLength: 65,
                    allowBlank: false
                },
                {
                    xtype: 'hidden',
                    name: 'templateId'
                }
            ]
        });

        this.items = [this.formPanel];

        this.callParent();
    }
});
