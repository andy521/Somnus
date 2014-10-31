Ext.define('App.apply.BtnSearch', {
    extend: 'Ext.button.Button',

    alias: 'widget.btnsearch',
    
    mixins: {
        bindable: 'Ext.util.Bindable'    
    },

    text:'查询',
    
    paramName : [],
    
	iconCls:'ext-icon-zoom_out',

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        
        me.bindStore(me.store || 'ext-empty-store', true);
        
        me.on('click', function(b,e, eOpt){
        	var toolbar = b.ownerCt;
        	var params = me.paramName;
        	Ext.each(params,function(param){
        		if(!Ext.isEmpty(toolbar.child('field[name="'+param+'"]').getValue())){
        			me.store.proxy.extraParams[param] = toolbar.child('field[name="'+param+'"]').getValue();
        			if(!Ext.isEmpty(toolbar.child('datefield[name="'+param+'"]'))&&!Ext.isEmpty(toolbar.child('datefield[name="'+param+'"]').getValue())){
        				me.store.proxy.extraParams[param] = Ext.dateFormat(toolbar.child('field[name="'+param+'"]').getValue());
        			}
        		}else{
        			delete me.store.proxy.extraParams[param];
        		}
        	});
        	me.store.load();
        });
        
        // We're going to use filtering
        me.store.remoteFilter = true;
       
        me.store.proxy.encodeFilters = function(filters) {
            return filters[0].value;
        }
    }
});