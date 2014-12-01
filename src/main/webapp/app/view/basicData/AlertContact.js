Ext.define('somnus.view.basicData.alertContact.AlertContact', {
    extend: 'somnus.common.base.BaseForm',
    alias: 'widget.alertContactWindow',
    title: '余额预警联系人',
    baseUrl: 'alertContact',
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
                    fieldLabel: '手机号',
                    name: 'phoneNo',
                    vtype: 'mobilephoneAndUnique',
                    vtypeEntity: 'AlertContact',
                    readOnly: !Ext.isEmpty(this.pk),
                    allowBlank: false
                },
                {
                    fieldLabel: '备注',
                    name: 'remark'
                },
                {
                    xtype: 'hidden',
                    name: 'contactId'
                }
            ]
        });

        this.items = [this.formPanel];

        this.callParent();
    }
});
