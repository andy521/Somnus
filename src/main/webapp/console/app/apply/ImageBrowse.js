Ext.define('App.apply.ImageBrowse', {
    extend: 'Ext.form.field.Trigger',

    alias: 'widget.imagebrowse',
    
    editable:false,
    
    mixins: {
        bindable: 'Ext.util.Bindable'    
    },
    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',

    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',

    paramName : 'query',

    initComponent: function() {
        var me = this;
        
        me.callParent(arguments);
        
        me.bindStore(me.store || 'ext-empty-store', true);
        
        me.on('specialkey', function(f, e){
            if (e.getKey() == e.ENTER) {
                me.onTrigger2Click();
            }
        });
    },

    afterRender: function(){
        this.callParent();
        $(this.getEl().query('input')).css("padding-left","20px").attr('readonly','readonly');
        this.triggerCell.item(0).setDisplayed(false);
    },

    onTrigger1Click : function(){
        var me = this;
        $(me.getEl().query('input')).removeClass(me.getValue());
        me.setValue('');
        me.triggerCell.item(0).setDisplayed(false);
        me.updateLayout();
    },

    onTrigger2Click : function(){
        var me = this;
        var googleWin = Ext.create('Ext.window.Window', {
			title : '浏览小图标',
			width : 850,
			height : 450,
			closable : true,
			autoScroll:true,
			autoLoad:{
				scripts:true,
				url:me.url
			},
			buttons:me.buttons
		});
		googleWin.show();
        me.triggerCell.item(0).setDisplayed(true);
        me.updateLayout();
    }
});