Ext.define('somnus.view.system.user.User', {
    extend: 'somnus.common.base.BaseForm',
    alias: 'widget.userWindow',
    title: '操作员信息',
    baseUrl: 'user',
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
                    fieldLabel: '登录名称',
                    name: 'loginName',
                    vtype: 'unique',
                    vtypeEntity: 'User',
                    allowBlank: false
                },
                {
                    fieldLabel: '登录密码',
                    inputType: "password",
                    hidden: !Ext.isEmpty(this.pk),
                    name: 'loginPwd',
                    id: 'loginPwd',
                    allowBlank: !Ext.isEmpty(this.pk)
                },
                {
                    fieldLabel: '确认密码',
                    inputType: "password",
                    hidden: !Ext.isEmpty(this.pk),
                    name: 'confirmPwd',
                    vtype: 'password',
                    vtypeText: "两次密码不一致！",
                    initialPassField: 'loginPwd',
                    allowBlank: !Ext.isEmpty(this.pk)
                },
                {
                    fieldLabel: '名称',
                    name: 'userName',
                    allowBlank: false
                },
                {
                    fieldLabel: '备注',
                    name: 'remark'
                },
                {
                    xtype: 'hidden',
                    name: 'userId'
                }
            ]
        });

        this.items = [this.formPanel];

        this.callParent();
    }
});
