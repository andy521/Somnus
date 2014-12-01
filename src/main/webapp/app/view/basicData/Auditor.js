Ext.define('somnus.view.basicData.auditor.Auditor', {
    extend: 'somnus.common.base.BaseForm',
    alias: 'widget.auditorWindow',
    title: '短信审核人员',
    baseUrl: 'auditor',
    initComponent: function () {

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyStyle: 'padding: 5px 10px',
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 110,
                anchor: '100%'
            },
            items: [
                {
                    fieldLabel: '应用平台',
                    xtype: 'basecombo',
                    entityName: 'App',
                    name: 'templateEntity.appEntity.appId',
                    allowBlank: false,
                    listeners: {
                        change: function (combo, newValue, oldValue, eOpts) {
                            if (Ext.isEmpty(newValue)) {
                                return;
                            }

                            Ext.defer(function () {
                                var templateCombo = this.next();
                                var templateComboValue = templateCombo.getValue();
                                templateCombo.clearValue();
                                var templateComboStore = templateCombo.store;
                                Ext.apply(templateComboStore.getProxy().extraParams, {
                                    paramName: 'appId',
                                    paramValue: newValue
                                });
                                templateComboStore.load({
                                    scope: this,
                                    callback: function (records, operation, success) {
                                        if (templateComboStore.find("value", templateComboValue) >= 0) {
                                            templateCombo.setValue(templateComboValue);
                                        }
                                    }
                                });
                            }, 10, this);
                        }
                    }
                },
                {
                    fieldLabel: '短信模板',
                    xtype: 'basecombo',
                    entityName: 'Template',
                    name: 'templateEntity.templateId',
                    allowBlank: false
                },
                {
                    fieldLabel: '审核人员登录名',
                    allowBlank: false,
                    listeners: {
                        blur: function (value, eOpts) {
							Ext.Ajax.request({
								params: {
					                loginName: this.value
					            },
					            scope: this,
	                            url: appContext.contextPath + '/user/getNameByLoginName',
	                            success: function (result) {
	                            	var results = Ext.decode(result.responseText);
	                                this.next().setValue(results.name);
	                                this.next().next().setValue(results.id);
	                            },
	                            failure: function (response) {
	                                Ext.Msg.alert("警告", "操作失败！");
	                                return;
	                            }
	                        });
                        }
                    }
                },
                {
                    fieldLabel: '审核人员名称',
                    readOnly: true,
                    allowBlank: false,
                    blankText:'请输入有效的登录名'
                },
                {
                    xtype: "hidden",
                    name: 'userEntity.userId'
                },
                {
                    fieldLabel: '备注',
                    name: 'remark'
                },
                {
                    xtype: 'hidden',
                    name: 'auditorId'
                }
            ]
        });

        this.items = [this.formPanel];

        this.callParent();
    }
});
