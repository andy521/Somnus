Ext.define('somnus.store.basicData.TemplateStore', {
    extend: 'somnus.common.base.GridStore',
    constructor: function (config) {
        config = Ext.apply({
            model: 'somnus.model.basicData.TemplateModel',
            baseUrl: 'template'
        }, config);
        this.callParent([config]);
    }
});
