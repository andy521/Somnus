Ext.define('somnus.store.basicData.ChannelStore', {
    extend: 'somnus.common.base.GridStore',
    constructor: function(config) {
        config = Ext.apply({
            model: 'somnus.model.basicData.ChannelModel',
            baseUrl:'channel'
        }, config);
        this.callParent([config]);
    }
});
