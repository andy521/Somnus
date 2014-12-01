Ext.define('somnus.controller.basicData.AppController', {
    extend: 'somnus.common.base.BaseController',
    stores: ['basicData.AppStore'],
    models: ['basicData.AppModel'],
    views: ['basicData.app.AppList', 'basicData.app.App'],
    refs: [
        {ref: 'appList', selector: 'appList'},
        {ref: 'appWindow', selector: 'appWindow', xtype: 'appWindow'}
    ],

    init: function () {
        this.control({
            'appList button[action=add]': {
                click: this.addApp
            },
            'appList button[action=query]': {
                click: this.queryApp
            },
            'appList button[action=update]': {
                click: this.updateApp
            },
            'appList button[action=remove]': {
                click: this.deleteApp
            }
        });
    },

    queryApp: function () {
        var store = this.getAppList().getStore();
        var appName = this.getAppList().down('#appName').getValue();
        var appCode = this.getAppList().down('#appCode').getValue();
        Ext.apply(store.getProxy().extraParams, {
            appName: appName,
            appCode: appCode
        });
        store.loadPage(1);
    },

    addApp: function () {
        Ext.create('somnus.view.basicData.app.App', {
            listeners: {
                success: function () {
                    this.getAppList().getStore().load();
                },
                scope: this
            }
        }).show();
    },


    updateApp: function () {

        var records = this.getAppList().getSelectionModel().getSelection();
        if (records.length != 1) {
            Ext.Msg.alert("提示", "只能选择一条记录进行编辑");
            return;
        }
        var appId = this.getAppList().getSelectionModel().getLastSelected().get('appId');

        Ext.create('somnus.view.basicData.app.App', {
            pk: appId,
            listeners: {
                success: function () {
                    this.getAppList().getStore().load();
                },
                failure: function () {
                    this.getAppWindow().close();
                    this.getAppList().getStore().load();
                },
                scope: this
            }
        }).show();
    },


    deleteApp: function (model, record, index, eOpts) {

        var records = this.getAppList().getSelectionModel().getSelection();
        if (records.length != 1) {
            Ext.Msg.alert("提示", "只能选择一条记录进行删除");
            return;
        }
        var grid = this.getAppList();
        grid.doDelete(grid, 'appId');

    }

});