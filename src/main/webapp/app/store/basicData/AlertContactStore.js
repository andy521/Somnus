Ext.define('somnus.store.basicData.AlertContactStore', {
    extend: 'somnus.common.base.GridStore',
    constructor: function (config) {
        config = Ext.apply({
            model: 'somnus.model.basicData.AlertContactModel',
            baseUrl: 'alertContact'
        }, config);
        this.callParent([config]);
    }
});
