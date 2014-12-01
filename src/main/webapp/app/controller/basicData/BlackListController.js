Ext.define('somnus.controller.basicData.BlackListController', {
    extend: 'somnus.common.base.BaseController',
    stores: ['basicData.BlackListStore'],
    models: ['basicData.BlackListModel'],
    views: ['basicData.blackList.BlackListList', 'basicData.blackList.BlackList'],
    refs: [
        {ref: 'blackListList', selector: 'blackListList'},
        {ref: 'blackListWindow', selector: 'blackListWindow', xtype: 'blackListWindow'}
    ],

    init: function () {
        this.control({
            'blackListList button[action=add]': {
                click: this.addBlackList
            },
            'blackListList button[action=update]': {
                click: this.updateBlackList
            },
            'blackListList button[action=remove]': {
                click: this.deleteBlackList
            },
            'blackListList button[action=queryBlackList]': {
                click: this.queryBlackList
            }
        });
    },

    addBlackList: function () {
        Ext.create('somnus.view.basicData.blackList.BlackList', {
            listeners: {
                success: function () {
                    this.getBlackListList().getStore().load();
                },
                scope: this
            }
        }).show();
    },


    updateBlackList: function () {

        var records = this.getBlackListList().getSelectionModel().getSelection();
        if (records.length > 1 || records.length == 0) {
            Ext.Msg.alert("提示", "只能选择一条记录进行编辑");
            return;
        }
        var blackListId = this.getBlackListList().getSelectionModel().getLastSelected().get('blackListId');

        Ext.create('somnus.view.basicData.blackList.BlackList', {
            pk: blackListId,
            listeners: {
                success: function () {
                    this.getBlackListList().getStore().load();
                },
                failure: function () {
                    this.getBlackListWindow().close();
                    this.getBlackListList().getStore().load();
                },
                scope: this
            }
        }).show();
    },


    deleteBlackList: function (model, record, index, eOpts) {

        var records = this.getBlackListList().getSelectionModel().getSelection();
        if (records.length > 1 || records.length == 0) {
            Ext.Msg.alert("提示", "只能选择一条记录进行删除");
            return;
        }
        var grid = this.getBlackListList();
        grid.doDelete(grid, 'blackListId');

    },

    queryBlackList: function () {

        var store = this.getBlackListList().getStore();
        var phoneNoFiled = this.getBlackListList().down('#phoneNo');

        if (!phoneNoFiled.isValid()) {
            Ext.Msg.alert("提示", "请输入有效的值");
            return;
        }
        Ext.apply(store.getProxy().extraParams, {
            phoneNo: phoneNoFiled.getValue()
        });
        store.loadPage(1);
    }

});