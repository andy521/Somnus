Ext.define('somnus.store.basicData.CmdStore', {
    extend: 'somnus.common.base.GridStore',
    constructor: function (config) {
        config = Ext.apply({
            model: 'somnus.model.basicData.CmdModel',
            baseUrl: 'cmd'
        }, config);
        this.callParent([config]);
    }
});
