Ext.define('somnus.store.basicData.AppStore', {
    extend: 'somnus.common.base.GridStore',
    constructor: function(config) {
        config = Ext.apply({
            model: 'somnus.model.basicData.AppModel',
            baseUrl:'app'
        }, config);
        this.callParent([config]);
    }
});
