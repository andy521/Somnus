Ext.define('somnus.controller.basicData.RouteCfgController', {
    extend: 'somnus.common.base.BaseController',
    stores: ['basicData.RouteCfgStore'],
    models: ['basicData.RouteCfgModel'],
    views: ['basicData.routeCfg.RouteCfgList', 'basicData.routeCfg.RouteCfg'],
    refs: [
        {ref: 'routeCfgList', selector: 'routeCfgList'},
        {ref: 'routeCfgWindow', selector: 'routeCfgWindow', xtype: 'routeCfgWindow'}
    ],

    init: function () {
        this.control({
            'routeCfgList button[action=add]': {
                click: this.addRouteCfg
            },
            'routeCfgList button[action=update]': {
                click: this.updateRouteCfg
            },
            'routeCfgList button[action=remove]': {
                click: this.deleteRouteCfg
            },
            'routeCfgList button[action=queryRouteCfg]': {
                click: this.queryRouteCfg
            }
        });
    },

    addRouteCfg: function () {
        Ext.create('somnus.view.basicData.routeCfg.RouteCfg', {
            listeners: {
                success: function () {
                    this.getRouteCfgList().getStore().load();
                },
                scope: this
            }
        }).show();
    },


    updateRouteCfg: function () {

        var records = this.getRouteCfgList().getSelectionModel().getSelection();
        if (records.length > 1 || records.length == 0) {
            Ext.Msg.alert("提示", "只能选择一条记录进行编辑");
            return;
        }
        var routeId = this.getRouteCfgList().getSelectionModel().getLastSelected().get('routeId');

        Ext.create('somnus.view.basicData.routeCfg.RouteCfg', {
            pk: routeId,
            listeners: {
                success: function () {
                    this.getRouteCfgList().getStore().load();
                },
                failure: function () {
                    this.getRouteCfgWindow().close();
                    this.getRouteCfgList().getStore().load();
                },
                scope: this
            }
        }).show();
    },


    deleteRouteCfg: function (model, record, index, eOpts) {

        var records = this.getRouteCfgList().getSelectionModel().getSelection();
        if (records.length > 1 || records.length == 0) {
            Ext.Msg.alert("提示", "只能选择一条记录进行删除");
            return;
        }
        var grid = this.getRouteCfgList();
        grid.doDelete(grid, 'routeId');

    },

    queryRouteCfg: function () {

        var store = this.getRouteCfgList().getStore();
        var appId = this.getRouteCfgList().down('#appId').getValue();
        var templateId = this.getRouteCfgList().down('#templateId').getValue();
        var channelId = this.getRouteCfgList().down('#channelId').getValue();
        Ext.apply(store.getProxy().extraParams, {
            'channelEntity.channelid': channelId,
            'appEntity.appId': appId,
            'templateEntity.templateId': templateId
        });
        store.loadPage(1);
    }

});