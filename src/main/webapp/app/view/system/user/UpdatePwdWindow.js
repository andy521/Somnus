Ext.define('somnus.view.system.user.UpdatePwdWindow', {
    extend: 'somnus.common.base.BaseForm',
    alias: 'widget.updatePwdWindow',
    title: '修改密码',
    baseUrl:'syuser',
    action:'doNotNeedSecurity_updateCurrentPwd',
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
            items: [{
                    fieldLabel: '新密码',
                    name: 'data.pwd',
                    id: 'newPwd',
                    inputType: "password",
                    allowBlank: false
                },
                {
                    fieldLabel: '确认新密码',
                    inputType: "password",
                    name: 'data.loginPwd',
                    vtype: 'password',
                    vtypeText: "两次密码不一致！",
                    initialPassField: 'newPwd',
                    allowBlank: false
                }
            ]
        });

        this.items = [this.formPanel];

        this.callParent();
    }
});