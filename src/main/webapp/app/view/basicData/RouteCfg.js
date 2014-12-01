Ext.define('somnus.view.basicData.routeCfg.RouteCfg', {
    extend: 'somnus.common.base.BaseForm',
    alias: 'widget.routeCfgWindow',
    title: '短信通道路由',
    baseUrl: 'routeCfg',
    initComponent: function () {

        var me = this;

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyStyle: 'padding: 5px 10px',
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 140,
                anchor: '100%'
            },
            items: [
                {
                    fieldLabel: '应用平台',
                    xtype: 'basecombo',
                    entityName: 'App',
                    name: 'appEntity.appId',
                    showAll: true,
                    allowBlank: false,
                    listeners: {

//                        change: function (combo, newValue, oldValue, eOpts) {
//
//                            Ext.defer(function () {
//                                var templateCombo = this.next();
//                                var templateComboValue = templateCombo.getValue();
//                                templateCombo.clearValue();
//                                var templateComboStore = templateCombo.store;
//                                Ext.apply(templateComboStore.getProxy().extraParams, {
//                                    paramName: 'appId',
//                                    paramValue: newValue
//                                });
//                                templateComboStore.load({
//                                    scope: this,
//                                    callback: function (records, operation, success) {
//                                        if (templateComboStore.find("value", templateComboValue) >= 0) {
//                                            templateCombo.setValue(templateComboValue);
//                                        }
//                                    }
//                                });
//                            }, 10, this);
//                        }
                        select: function (combo, record, index) {
                            var templateCombo = this.next();
                            templateCombo.clearValue();

                            var templateComboStore = templateCombo.store;

                            Ext.apply(templateComboStore.getProxy().extraParams, {
                                paramName: 'appId',
                                paramValue: this.value
                            });

                            templateComboStore.load();
                        }
                    }
                },
                {
                    fieldLabel: '短信模板',
                    xtype: 'basecombo',
                    entityName: 'Template',
                    name: 'templateEntity.templateId',
                    showAll: true,
                    allowBlank: false
                },
                {
                    fieldLabel: '优先级',
                    name: 'priority',
                    minValue: 1,
                    allowDecimals: false,
                    xtype: 'numberfield',
                    allowBlank: false,
                    listeners: {
                        beforerender: function () {
                            Ext.Ajax.request({
                                method: 'post',
                                scope: this,
                                url: app.contextPath + '/routeCfg/queryCount',
                                success: function (response) {
                                    var results = Ext.decode(response.responseText);
                                    if (results.success) {
                                        if (Ext.isEmpty(me.pk)) {
                                            this.setValue(results.total + 1);
                                        } else {
                                            this.setValue(results.total);
                                        }
                                        this.maxValue = this.getValue();
                                    }
                                }
                            });
                        }
                    }
                },
                {
                    fieldLabel: '短信通道',
                    xtype: 'basecombo',
                    entityName: 'Channel',
                    name: 'channelEntity.channelid',
                    allowBlank: false
                },
                {
                    fieldLabel: '备注',
                    name: 'remark'
                },
                {
                    xtype: 'hidden',
                    name: 'routeId'
                }
            ]
        });

        this.items = [this.formPanel];

        this.callParent();
    }
});
