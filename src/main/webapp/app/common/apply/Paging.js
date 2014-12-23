/*
 * @author Somnus
 * @description 分页插件扩展，控制每页显示条数
 */
Ext.define('somnus.common.apply.Paging', {
    extend: 'Ext.toolbar.Paging',
    alias: 'widget.pagingtoolbar',
    requires: ['Ext.form.field.ComboBox'],
    initComponent : function(){
    	var me = this;
    	Ext.apply(this,{prependButtons:true});
    	this.items = Ext.apply([], this.items);
    	this.items.push('每页');
    	this.items.push({
    		xtype : 'combo',
			store : {
				fields : ['text', 'value'],
				data : [{
					text : '10',value : '10'
				},{
					text : '20',value : '20'
				},{
					text : '30',value : '30'
				},{
					text : '40',value : '40'
				},{
					text : '50',value : '50'
				}]
			},
			valueField : 'value',
			displayField : 'text',
			queryMode : 'local',
			value:25,
			width:50,
			listeners:{
				change:function(combo,newValue, oldValue, eOpts){
					me.store.pageSize = newValue;
					if (me.fireEvent('beforechange', this, 1) !== false){
						me.store.loadPage(1);
			        }
				}
			}
    	});
    	this.items.push('条');
        this.callParent();
    }
});