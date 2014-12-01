Ext.define('somnus.store.basicData.AuditorStore', {
    extend: 'somnus.common.base.GridStore',
    constructor: function (config) {
        config = Ext.apply({
            model: 'somnus.model.basicData.AuditorModel',
            baseUrl: 'auditor'
        }, config);
        this.callParent([config]);
    }
});
