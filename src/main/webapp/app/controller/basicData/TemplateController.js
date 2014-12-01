Ext.define('somnus.controller.basicData.TemplateController', {
    extend: 'somnus.common.base.BaseController',
    stores: ['basicData.TemplateStore'],
    models: ['basicData.TemplateModel'],
    views: ['basicData.template.TemplateList', 'basicData.template.Template'],
    refs: [
        {ref: 'templateList', selector: 'templateList'},
        {ref: 'templateWindow', selector: 'templateWindow', xtype: 'templateWindow'}
    ],

    init: function () {
        this.control({
            'templateList button[action=add]': {
                click: this.addTemplate
            },
            'templateList button[action=update]': {
                click: this.updateTemplate
            },
            'templateList button[action=remove]': {
                click: this.deleteTemplate
            },
            'templateList button[action=queryTemplate]': {
                click: this.queryTemplate
            }
        });
    },

    addTemplate: function () {
        Ext.create('somnus.view.basicData.template.Template', {
            listeners: {
                success: function () {
                    this.getTemplateList().getStore().load();
                },
                scope: this
            }
        }).show();
    },


    updateTemplate: function () {

        var records = this.getTemplateList().getSelectionModel().getSelection();
        if (records.length > 1 || records.length == 0) {
            Ext.Msg.alert("提示", "只能选择一条记录进行编辑");
            return;
        }
        var templateId = this.getTemplateList().getSelectionModel().getLastSelected().get('templateId');

        Ext.create('somnus.view.basicData.template.Template', {
            pk: templateId,
            listeners: {
                success: function () {
                    this.getTemplateList().getStore().load();
                },
                failure: function () {
                    this.getTemplateWindow().close();
                    this.getTemplateList().getStore().load();
                },
                scope: this
            }
        }).show();
    },


    deleteTemplate: function (model, record, index, eOpts) {

        var records = this.getTemplateList().getSelectionModel().getSelection();
        if (records.length > 1 || records.length == 0) {
            Ext.Msg.alert("提示", "只能选择一条记录进行删除");
            return;
        }
        var grid = this.getTemplateList();
        grid.doDelete(grid, 'templateId');

    },

    queryTemplate: function () {

        var store = this.getTemplateList().getStore();
        var templateIdFiled = this.getTemplateList().down('#templateId');
        if (!templateIdFiled.isValid()) {
            Ext.Msg.alert("提示", "请输入有效的值");
            return;
        }
        var templateName = this.getTemplateList().down('#templateName').getValue();
        var appId = this.getTemplateList().down('#appId').getValue();
        Ext.apply(store.getProxy().extraParams, {
            'appEntity.appId': appId,
            templateName: templateName,
            templateId: templateIdFiled.getValue()
        });
        store.loadPage(1);
    }

});