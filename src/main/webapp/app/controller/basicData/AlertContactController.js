Ext.define('somnus.controller.basicData.AlertContactController', {
    extend: 'somnus.common.base.BaseController',
    stores: ['basicData.AlertContactStore'],
    models: ['basicData.AlertContactModel'],
    views: ['basicData.alertContact.AlertContactList', 'basicData.alertContact.AlertContact'],
    refs: [
        {ref: 'alertContactList', selector: 'alertContactList'},
        {ref: 'alertContactWindow', selector: 'alertContactWindow', xtype: 'alertContactWindow'}
    ],

    init: function () {
        this.control({
            'alertContactList button[action=add]': {
                click: this.addAlertContact
            },
            'alertContactList button[action=update]': {
                click: this.updateAlertContact
            },
            'alertContactList button[action=remove]': {
                click: this.deleteAlertContact
            },
            'alertContactList button[action=queryAlertContact]': {
                click: this.queryAlertContact
            }
        });
    },

    addAlertContact: function () {
        Ext.create('somnus.view.basicData.alertContact.AlertContact', {
            listeners: {
                success: function () {
                    this.getAlertContactList().getStore().load();
                },
                scope: this
            }
        }).show();
    },


    updateAlertContact: function () {

        var records = this.getAlertContactList().getSelectionModel().getSelection();
        if (records.length > 1 || records.length == 0) {
            Ext.Msg.alert("提示", "只能选择一条记录进行编辑");
            return;
        }
        var contactId = this.getAlertContactList().getSelectionModel().getLastSelected().get('contactId');

        Ext.create('somnus.view.basicData.alertContact.AlertContact', {
            pk: contactId,
            listeners: {
                success: function () {
                    this.getAlertContactList().getStore().load();
                },
                failure: function () {
                    this.getAlertContactWindow().close();
                    this.getAlertContactList().getStore().load();
                },
                scope: this
            }
        }).show();
    },


    deleteAlertContact: function (model, record, index, eOpts) {

        var records = this.getAlertContactList().getSelectionModel().getSelection();
        if (records.length > 1 || records.length == 0) {
            Ext.Msg.alert("提示", "只能选择一条记录进行删除");
            return;
        }
        var grid = this.getAlertContactList();
        grid.doDelete(grid, 'contactId');

    },

    queryAlertContact: function () {

        var store = this.getAlertContactList().getStore();

        var phoneNoFiled = this.getAlertContactList().down('#phoneNo');

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