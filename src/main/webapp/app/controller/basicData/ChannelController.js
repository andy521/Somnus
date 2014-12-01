Ext.define('somnus.controller.basicData.ChannelController', {
    extend: 'somnus.common.base.BaseController',
    stores: ['basicData.ChannelStore'],
    models: ['basicData.ChannelModel'],
    views: ['basicData.channel.ChannelList', 'basicData.channel.Channel'],
    refs: [
        {ref: 'channelList', selector: 'channelList'},
        {ref: 'channelWindow', selector: 'channelWindow', xtype: 'channelWindow'}
    ],

    init: function () {
        this.control({
            'channelList button[action=query]': {
                click: this.queryChannel
            },
            'channelList button[action=add]': {
                click: this.addChannel
            },
            'channelList button[action=update]': {
                click: this.updateChannel
            },
            'channelList button[action=remove]': {
                click: this.deleteChannel
            },
            'channelList button[action=quertbalance]': {
                click: this.queryBalance
            }
        });
    },

    addChannel: function () {
        Ext.create('somnus.view.basicData.channel.Channel', {
            listeners: {
                success: function () {
                    this.getChannelList().getStore().load();
                },
                scope: this
            }
        }).show();
    },


    updateChannel: function () {

        var records = this.getChannelList().getSelectionModel().getSelection();
        if (records.length > 1) {
            Ext.Msg.alert("提示", "只能选择一条记录进行编辑");
            return;
        }
        if (records.length < 1) {
            Ext.Msg.alert("提示", "请选择一条记录进行编辑");
            return;
        }
        var channelid = this.getChannelList().getSelectionModel().getLastSelected().get('channelid');
        Ext.create('somnus.view.basicData.channel.Channel', {
            pk: channelid,
            listeners: {
                success: function () {
                    this.getChannelList().getStore().load();
                },
                failure: function () {
                    this.getChannelWindow().close();
                    this.getChannelList().getStore().load();
                },
                scope: this
            }
        }).show();
    },


    deleteChannel: function (model, record, index, eOpts) {

        var records = this.getChannelList().getSelectionModel().getSelection();
        if (records.length > 1) {
            Ext.Msg.alert("提示", "只能选择一条记录进行删除");
            return;
        }
        if (records.length < 1) {
            Ext.Msg.alert("提示", "请选择一条记录进行删除");
            return;
        }
        var grid = this.getChannelList();
        grid.doDelete(grid, 'channelid');

    },
    queryChannel: function () {
        var store = this.getChannelList().getStore();
        var channelName = this.getChannelList().down('#channelName').getValue();
        Ext.apply(store.getProxy().extraParams, {
            channelName: channelName
        });
        store.loadPage(1);
    },

    queryBalance: function () {
        var records = this.getChannelList().getSelectionModel().getSelection();
        if (records.length > 1) {
            Ext.Msg.alert("提示", "只能选择一条记录进行查询");
            return;
        }
        if (records.length < 1) {
            Ext.Msg.alert("提示", "请选择一条记录进行查询");
            return;
        }
        var beanId = this.getChannelList().getSelectionModel().getLastSelected().get('beanId');
        var me = this;
        Ext.create('somnus.view.basicData.channel.ChannelBalance', {
            pk: beanId,
            listeners: {
                success: function () {
                    this.getChannelList().getStore().load();
                },
                scope: this
            }
        }).show();

    }

});