/*
 * @author Somnus
 * @description 图片弹出框
 */
Ext.define('somnus.common.apply.ImageBrowse', {
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
    	var me = this;
        this.callParent();
        me.up('form').on('actioncomplete',function(){
        	console.log("$$$$"+me.getValue().substring(9));
    		$(this.getEl().query('input[name=data.iconCls]')).attr('readonly','readonly').css({
            	background: Ext.String.format('#ffffff url({0}/style/images/ext_icons/{1}.png) no-repeat left center',app.contextPath,me.getValue().substring(9)), 
    			paddingLeft: '20px' 
            });
    	});
        this.triggerCell.item(0).setDisplayed(false);
    },

    onTrigger1Click : function(){
        var me = this;
        $(me.getEl().query('input')).removeClass(me.getValue()).css({
        	backgroundImage:'',
        	paddingLeft: '5px' 
        });
        me.setValue('');
        me.triggerCell.item(0).setDisplayed(false);
        me.updateLayout();
    },

    onTrigger2Click : function(){
        var me = this;
        var googleWin = Ext.create('Ext.window.Window', {
			title : '浏览小图标',
			modal: true,
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