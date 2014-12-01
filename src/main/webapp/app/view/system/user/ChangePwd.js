Ext.define('somnus.view.system.user.ChangePwd', {
    extend: 'somnus.common.base.BaseForm',
    alias: 'widget.userWindow',
    title: '修改密码',
    baseUrl:'user',
    action:'changeLoginPwd',
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
                    fieldLabel: '原密码',
                    name: 'oldPwd',
                    inputType: "password",
                    allowBlank: false
                },
                {
                    fieldLabel: '新密码',
                    name: 'newPwd',
                    id: 'newPwd',
                    inputType: "password",
                    allowBlank: false
                },
                {
                    fieldLabel: '确认新密码',
                    inputType: "password",
                    name: 'loginPwd',
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
