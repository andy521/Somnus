Ext.define('somnus.controller.basicData.CmdController', {
    extend: 'somnus.common.base.BaseController',
    stores: ['basicData.CmdStore'],
    models: ['basicData.CmdModel'],
    views: ['basicData.cmd.CmdList', 'basicData.cmd.Cmd'],
    refs: [
        {ref: 'cmdList', selector: 'cmdList'},
        {ref: 'cmdWindow', selector: 'cmdWindow', xtype: 'cmdWindow'}
    ],

    init: function () {
        this.control({
            'cmdList button[action=add]': {
                click: this.addCmd
            },
            'cmdList button[action=update]': {
                click: this.updateCmd
            },
            'cmdList button[action=remove]': {
                click: this.deleteCmd
            },
            'cmdList button[action=queryCmd]': {
                click: this.queryCmd
            }
        });
    },

    addCmd: function () {
        Ext.create('somnus.view.basicData.cmd.Cmd', {
            listeners: {
                success: function () {
                    this.getCmdList().getStore().load();
                },
                scope: this
            }
        }).show();
    },


    updateCmd: function () {

        var records = this.getCmdList().getSelectionModel().getSelection();
        if (records.length > 1 || records.length == 0) {
            Ext.Msg.alert("提示", "只能选择一条记录进行编辑");
            return;
        }
        var appId = this.getCmdList().getSelectionModel().getLastSelected().get('cmdId');

        Ext.create('somnus.view.basicData.cmd.Cmd', {
            pk: appId,
            listeners: {
                success: function () {
                    this.getCmdList().getStore().load();
                },
                failure: function () {
                    this.getCmdWindow().close();
                    this.getCmdList().getStore().load();
                },
                scope: this
            }
        }).show();
    },


    deleteCmd: function (model, record, index, eOpts) {

        var records = this.getCmdList().getSelectionModel().getSelection();
        if (records.length > 1 || records.length == 0) {
            Ext.Msg.alert("提示", "只能选择一条记录进行删除");
            return;
        }
        var grid = this.getCmdList();
        grid.doDelete(grid, 'cmdId');

    },

    queryCmd: function () {

        var store = this.getCmdList().getStore();
        var appId = this.getCmdList().down('#appId').getValue();
        var cmdName = this.getCmdList().down('#cmdName').getValue();
        var cmdCode = this.getCmdList().down('#cmdCode').getValue();
        Ext.apply(store.getProxy().extraParams, {
            'appEntity.appId': appId,
            cmdName: cmdName,
            cmdCode: cmdCode
        });
        store.loadPage(1);
    }

});