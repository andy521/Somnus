Ext.define('somnus.view.basicData.blackList.BlackList', {
    extend: 'somnus.common.base.BaseForm',
    alias: 'widget.blackListWindow',
    title: '黑名单',
    baseUrl: 'blackList',
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
                    fieldLabel: '手机号',
                    name: 'phoneNo',
                    readOnly: !Ext.isEmpty(this.pk),
                    vtype: 'mobilephoneAndUnique',
                    vtypeEntity: 'BlackList',
                    allowBlank: false
                },
                {
                    fieldLabel: '备注',
                    name: 'remark'
                },
                {
                    xtype: 'hidden',
                    name: 'blackListId'
                }
            ]
        });

        this.items = [this.formPanel];

        this.callParent();

//        this.on('show', function () {
//            this.formPanel.getComponent(0).focus(false, 500);
//        }, this);
    }
});
