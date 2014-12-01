Ext.define('somnus.controller.system.UserController', {
    extend: 'somnus.common.base.BaseController',
    stores: ['system.UserStore'],
    models: ['system.UserModel'],
    views: ['system.user.UserList', 'system.user.User', 'system.user.ResetPwd'],
    refs: [
        {ref: 'userList', selector: 'userList'},
        {ref: 'userWindow', selector: 'userWindow', xtype: 'userWindow'},
        {ref: 'resetPwdWindow', selector: 'resetPwdWindow', xtype: 'resetPwdWindow'}
    ],

    init: function () {
        this.control({
            'userList button[action=create]': {
                click: this.createUser
            },
            'userList button[action=update]': {
                click: this.updateUser
            },
            'userList button[action=delete]': {
                click: this.deleteUser
            } ,
            'userList button[action=queryUser]': {
                click: this.queryUser
            },
            'userList button[action=resetPwd]': {
                click: this.resetPwd
            }
        });
    },


    createUser: function () {
        Ext.create('somnus.view.system.user.User', {
            listeners: {
                success: function () {
                    this.getUserList().getStore().load();
                },
                scope: this
            }
        }).show();
    },


    updateUser: function () {

        var records = this.getUserList().getSelectionModel().getSelection();
        if (records.length != 1) {
            Ext.Msg.alert("提示", "只能选择一条记录进行编辑");
            return;
        }
        var userId = this.getUserList().getSelectionModel().getLastSelected().get('userId');

        Ext.create('somnus.view.system.user.User', {
            pk: userId,
            listeners: {
                success: function () {
                    this.getUserList().getStore().load();
                },
                failure: function () {
                    this.getUserWindow().close();
                    this.getUserList().getStore().load();
                },
                scope: this
            }
        }).show();
    },


    deleteUser: function (model, record, index, eOpts) {

    	 var records = this.getUserList().getSelectionModel().getSelection();
         if (records.length != 1) {
             Ext.Msg.alert("提示", "只能选择一条记录进行删除");
             return;
         }
        var grid = this.getUserList();
        grid.doDelete(grid, 'userId');

    },


    queryUser: function () {
        var store=this.getUserList().getStore();
        var userName = this.getUserList().down('#userName').getValue();
        var loginName = this.getUserList().down('#loginName').getValue();
        Ext.apply(store.getProxy().extraParams, {
            userName: userName,
            loginName: loginName
        });
        store.loadPage(1);
    },

    resetPwd: function () {

        var records = this.getUserList().getSelectionModel().getSelection();
        if (records.length != 1) {
            Ext.Msg.alert("提示", "只能选择一条记录进行编辑");
            return;
        }
        var userId = this.getUserList().getSelectionModel().getLastSelected().get('userId');
        var loginName = this.getUserList().getSelectionModel().getLastSelected().get('loginName');

        Ext.create('somnus.view.system.user.ResetPwd', {
            pk: userId,
            loginName: loginName,
            listeners: {
                success: function () {
                    this.getUserList().getStore().load();
                },
                scope: this
            }
        }).show();

    }


});