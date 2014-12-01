Ext.define('somnus.controller.basicData.AuditorController', {
    extend: 'somnus.common.base.BaseController',
    stores: ['basicData.AuditorStore'],
    models: ['basicData.AuditorModel'],
    views: ['basicData.auditor.AuditorList', 'basicData.auditor.Auditor'],
    refs: [
        {ref: 'auditorList', selector: 'auditorList'},
        {ref: 'auditorWindow', selector: 'auditorWindow', xtype: 'auditorWindow'}
    ],

    init: function () {
        this.control({
            'auditorList button[action=add]': {
                click: this.addAuditor
            },
            'auditorList button[action=update]': {
                click: this.updateAuditor
            },
            'auditorList button[action=remove]': {
                click: this.deleteAuditor
            },
            'auditorList button[action=query]': {
                click: this.queryAuditor
            }
        });
    },

    addAuditor: function () {
        Ext.create('somnus.view.basicData.auditor.Auditor', {
            listeners: {
                success: function () {
                    this.getAuditorList().getStore().load();
                },
                scope: this
            }
        }).show();
    },


    updateAuditor: function () {

        var records = this.getAuditorList().getSelectionModel().getSelection();
        if (records.length > 1 || records.length == 0) {
            Ext.Msg.alert("提示", "只能选择一条记录进行编辑");
            return;
        }
        var auditorId = this.getAuditorList().getSelectionModel().getLastSelected().get('auditorId');

        Ext.create('somnus.view.basicData.auditor.Auditor', {
            pk: auditorId,
            listeners: {
                success: function () {
                    this.getAuditorList().getStore().load();
                },
                failure: function () {
                    this.getAuditorWindow().close();
                    this.getAuditorList().getStore().load();
                },
                scope: this
            }
        }).show();
    },


    deleteAuditor: function (model, record, index, eOpts) {

        var records = this.getAuditorList().getSelectionModel().getSelection();
        if (records.length > 1 || records.length == 0) {
            Ext.Msg.alert("提示", "只能选择一条记录进行删除");
            return;
        }
        var grid = this.getAuditorList();
        grid.doDelete(grid, 'auditorId');

    },

    queryAuditor: function () {

        var store = this.getAuditorList().getStore();
        var templateId = this.getAuditorList().down('#templateId').getValue();
        var appId = this.getAuditorList().down('#appId').getValue();
        var auditorName = this.getAuditorList().down('#auditorName').getValue();
        var auditorLoginName = this.getAuditorList().down('#auditorLoginName').getValue();
        Ext.apply(store.getProxy().extraParams, {
            'userEntity.userName': auditorName,
            'userEntity.loginName': auditorLoginName,
            'templateEntity.appEntity.appId': appId,
            'templateEntity.templateId': templateId
        });
        store.loadPage(1);
    }

});