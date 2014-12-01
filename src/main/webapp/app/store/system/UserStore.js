Ext.define('somnus.store.system.UserStore', {
    extend: 'somnus.common.base.GridStore',
    constructor: function(config) {
        config = Ext.apply({
            model: 'somnus.model.system.UserModel',
            baseUrl:'user'
        }, config);
        this.callParent([config]);
    }
});
