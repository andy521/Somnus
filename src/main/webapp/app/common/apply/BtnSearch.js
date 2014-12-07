Ext.define('somnus.common.apply.BtnSearch', {
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
        	var dateRange = b.ownerCt.down('#daterange');
        	if(!Ext.isEmpty(dateRange)){
        		var startDate = dateRange.getStartDate();
        		var endDate = dateRange.getEndDate();
        		if (startDate > endDate) {
        			Ext.Msg.show({
        				title: '信息',
        				msg: '开始时间大于结束时间！',
        				icon: Ext.Msg.INFO
        			});
        			return;
        		}
        	}
        	Ext.each(params,function(param){
        		if(!Ext.isEmpty(toolbar.down('field[name="'+param+'"]').getValue())){
        			me.store.proxy.extraParams[param] = toolbar.down('field[name="'+param+'"]').getValue();
        			if(!Ext.isEmpty(toolbar.down('datefield[name="'+param+'"]'))&&!Ext.isEmpty(toolbar.down('datefield[name="'+param+'"]').getValue())){
        				me.store.proxy.extraParams[param] = Ext.dateFormat(toolbar.down('field[name="'+param+'"]').getValue());
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