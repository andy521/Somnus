Ext.define('somnus.view.system.user.ResetPwd', {
    extend: 'somnus.common.base.BaseForm',
    alias: 'widget.resetPwdWindow',
    title: '重置密码',
    baseUrl: 'user',
    initComponent: function () {

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyStyle: 'padding: 5px 10px',
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 75,
                anchor: '100%'
            },
            items: [
                {
                    fieldLabel: '新密码',
                    inputType: "password",
                    name: 'loginPwd',
                    id: 'loginPwd',
                    allowBlank: false
                },
                {
                    fieldLabel: '确认新密码',
                    inputType: "password",
                    name: 'confirmPwd',
                    vtype: 'password',
                    vtypeText: "两次密码不一致！",
                    initialPassField: 'loginPwd',
                    allowBlank: false
                },
                {
                    xtype: 'hidden',
                    name: 'userId'
                },
                {
                    xtype: 'hidden',
                    name: 'loginName',
                    value: this.loginName
                }
            ]
        });

        this.items = [this.formPanel];

        this.callParent();
    }
});
