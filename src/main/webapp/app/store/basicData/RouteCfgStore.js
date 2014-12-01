Ext.define('somnus.store.basicData.RouteCfgStore', {
    extend: 'somnus.common.base.GridStore',
    constructor: function (config) {
        config = Ext.apply({
            model: 'somnus.model.basicData.RouteCfgModel',
            baseUrl: 'routeCfg'
        }, config);
        this.callParent([config]);
    }
});
