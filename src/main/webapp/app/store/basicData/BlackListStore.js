Ext.define('somnus.store.basicData.BlackListStore', {
    extend: 'somnus.common.base.GridStore',
    constructor: function (config) {
        config = Ext.apply({
            model: 'somnus.model.basicData.BlackListModel',
            baseUrl: 'blackList'
        }, config);
        this.callParent([config]);
    }
});
