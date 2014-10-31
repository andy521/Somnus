Ext.define('App.apply.EmptySearch', {
    extend: 'Ext.button.Button',

    alias: 'widget.emptysearch',
    
    mixins: {
        bindable: 'Ext.util.Bindable'    
    },

    text:'清空查询',
    
	iconCls:'ext-icon-zoom_out',

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        
        me.bindStore(me.store || 'ext-empty-store', true);
        
        me.on('click', function(b,e, eOpt){
        	me.store.clearFilter();
        });
        
        // We're going to use filtering
        me.store.remoteFilter = true;
       
        me.store.proxy.encodeFilters = function(filters) {
            return filters[0].value;
        }
    }
});