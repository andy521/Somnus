Ext.define('somnus.view.basicData.channel.Channel', {
    extend: 'somnus.common.base.BaseForm',
    alias: 'widget.channelWindow',
    title: '通道信息',
    baseUrl:'channel',
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
                    fieldLabel: '通道名称',
                    name: 'channelName',
                    vtype: 'unique',
                    vtypeEntity: 'Channel',
                    allowBlank: false
                },
                {
                    fieldLabel: '预警金额',
                    xtype: 'numberfield',
                    minValue: 0,
                    maxLength: 15,
                    name: 'alertbalance',
                    allowBlank: false
                },
                {
                    fieldLabel: 'beanId',
                    vtype: 'unique',
                    vtypeEntity: 'Channel',
                    name: 'beanId',
                    allowBlank: false
                },
                {
                    fieldLabel: '备注',
                    name: 'remark'
                },
				 {
                    xtype: 'hidden',
                    name: 'channelid'
                }
            ]
        });

        this.items = [this.formPanel];

        this.callParent();
    }
});
