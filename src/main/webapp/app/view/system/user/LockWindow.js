Ext.define('somnus.view.system.user.LockWindow', {
    extend: 'somnus.common.base.BaseForm',
    alias: 'widget.lockWindow',
    title: '解锁登录',
    baseUrl:'syuser',
    action:'doNotNeedSessionAndSecurity_login',
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
            	fieldLabel : '登陆名',
    			readOnly:true,
    			name : 'data.loginname',
    			value:app.loginname
                },
                {
                	name : 'data.pwd',
        			fieldLabel : '密码',
        			inputType : 'password',
                    allowBlank: false
                }
            ]
        });

        this.items = [this.formPanel];

        this.callParent();
    }
});