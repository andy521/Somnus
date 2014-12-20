Ext.define('somnus.view.system.user.LockWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.lockWindow',
    title: '解锁登录',
    width: 320,
    modal: true,
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
                },{
                	name : 'data.pwd',
        			fieldLabel : '密码',
        			inputType : 'password',
                    allowBlank: false
                }
            ]
        });
        
        this.buttons = this.buttons || [];
        var me = this;
		var form = this.formPanel.getForm();
        this.buttons.push({
        	text: '解锁',
        	handler: function(){
        		if (!form.isValid()) {
        			return;
        		}
        		form.submit({
        			url:app.contextPath + '/base/syuser!doNotNeedSessionAndSecurity_login.action',
        			submitEmptyText: false,
        			waitMsg: '正在解锁...',
        			success: function (form, action) {
        				var results = Ext.decode(action.response.responseText);
        				if (results.success) {
        					Ext.Msg.show({
        						title: '信息',
        						msg: '解锁成功！',
        						buttons: Ext.Msg.OK,
        						icon: Ext.Msg.INFO,
        						fn: function () {
        							me.fireEvent('success');
        							me.close();
        						}
        					});
        				}
        			},
        			failure: function (form, action) {
        				var result = Ext.decode(action.response.responseText);
        				if(!Ext.isEmpty(result.sessionstatus)&&result.sessionstatus=='timeOut'){
        					me.ownerCt.close();
        					Ext.Msg.show({
        						title: '信息',
        						msg: '对不起，当前登录已过期，请重新登录！',
        						buttons: Ext.Msg.OK,
        						icon: Ext.Msg.INFO,
        						fn: function () {
        							window.location.href = app.contextPath;
        						}
        					});
        				}
        			}
        		});
        	},
        	scope: this
        },{
        	text: '关闭',
        	handler: this.close,
        	scope: this
        });
        
        this.items = [this.formPanel];
        
        this.callParent();
    }
});