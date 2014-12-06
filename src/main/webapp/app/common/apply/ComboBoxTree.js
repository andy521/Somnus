/**
 * cascade 级联方式:1.child子级联;2.parent,父级联,3,both全部级联  
 * checkModel:'single',//当json数据为不带checked的数据时只配置为single,带checked配置为double为单选,不配置为多选 
 */
Ext.define("somnus.common.apply.ComboBoxTree", {  
    extend: "Ext.form.field.Picker",  
    requires: ["Ext.tree.Panel"],  
    alias: 'widget.combotree',
    submitValue:'',
    editable: false,
    mixins: {
        bindable: 'Ext.util.Bindable'    
    },
    initComponent: function() {
        var me = this;  
        me.bindStore(me.store || 'ext-empty-store', true);
        Ext.apply(me, {  
            fieldLabel: me.fieldLabel,  
            labelWidth: me.labelWidth  
        });  
        me.callParent();  
        this.on('change',function(self,newValue, oldValue, eOpts){
        	if(Ext.isEmpty(oldValue)){
            	self.getStore().load();
            	self.getStore().on('load',function(store, node, records, successful, eOpts ){
            		Ext.each(records,function(record){
            			if(newValue==record.get('id')){
            				self.submitValue = record.get('id');
            				self.setValue(record.get('text'));
            				return;
            			}
            			//如果父类找不到，遍历子节点
            			if(!Ext.isEmpty(record.get('children'))){
            				Ext.each(record.get('children'),function(rec){
            					if(newValue==rec.id){
                    				self.submitValue = rec.id
                    				self.setValue(rec.text);
                    				return;
                    			}
            				});
            			}
            		});
            	});
        	}
        })
    },
    createPicker: function() {
        var me = this;  
        me.picker = new Ext.tree.Panel({
            height: 300,  
            autoScroll: true,  
            floating: true,  
            focusOnToFront: false,  
            shadow: true,  
            ownerCt: this.ownerCt,  
            useArrows: true,  
            store: me.store,  
            rootVisible: false  
        });  
        me.picker.on({
            checkchange: function(record, checked) {
                var checkModel = me.checkModel;
                if (checkModel == 'double') {
                    var root = me.picker.getRootNode();
                    root.cascadeBy(function(node) {
                        if (node.get('text') != record.get('text')) {
                            node.set('checked', false);
                        }
                    });
                    if (record.get('leaf') && checked) {
                        me.setRawValue(record.get('id')); // 隐藏值
                        me.setValue(record.get('text')); // 显示值
                    } else {  
                        record.set('checked', false);  
                        me.setRawValue(''); // 隐藏值  
                        me.setValue(''); // 显示值  
                    }  
                } else {
                    var cascade = me.cascade;  
                    if (checked == true) {
                        if (cascade == 'both' || cascade == 'child' || cascade == 'parent') {  
                            if (cascade == 'child' || cascade == 'both') {  
                                if (!record.get("leaf") && checked) record.cascadeBy(function(record) {  
                                    record.set('checked', true);  
                                });  
                            }  
                            if (cascade == 'parent' || cascade == 'both') {
                                pNode = record.parentNode;  
                                for (; pNode != null; pNode = pNode.parentNode) {
                                    pNode.set("checked", true);  
                                }
                            }
                        }
                    } else if (checked == false) {
                        if (cascade == 'both' || cascade == 'child' || cascade == 'parent') {
                            if (cascade == 'child' || cascade == 'both') {  
                                if (!record.get("leaf") && !checked) record.cascadeBy(function(record) {
                                    record.set('checked', false);  
                                });
                            }
                        }
                    }
                    var records = me.picker.getView().getChecked(),
                    names = [],  
                    values = [];  
                    Ext.Array.each(records, function(rec) {  
                        names.push(rec.get('text'));  
                        values.push(rec.get('id'));  
                    });  
                    me.setRawValue(values.join(';')); // 隐藏值  
                    me.submitValue = values.join(';');
                    me.setValue(names.join(';')); // 显示值  
                }  
            },  
            itemclick: function(tree, record, item, index, e, options) {  
                var checkModel = me.checkModel;
                if (checkModel == 'single') {
                	me.setRawValue(record.get('id')); // 隐藏值 
                	me.submitValue = record.get('id');
                    me.setValue(record.get('text')); // 显示值  
                    me.collapse();
                }  
            }
        });  
        return me.picker;  
    },
    getSubmitValue: function(){
    	var me = this,  
    	value = me.submitValue;
    	if (Ext.isEmpty(value)) {
            value = '';
        }
        return value;
    },
    alignPicker: function() {
        var me = this,  
        picker, isAbove, aboveSfx = '-above';  
        if (this.isExpanded) {
            picker = me.getPicker();  
            if (me.matchFieldWidth) {  
                picker.setWidth(me.bodyEl.getWidth());  
            }  
            if (picker.isFloating()) {  
                picker.alignTo(me.inputEl, "", me.pickerOffset); // ""->tl  
                isAbove = picker.el.getY() < me.inputEl.getY();  
                me.bodyEl[isAbove ? 'addCls': 'removeCls'](me.openCls + aboveSfx);  
                picker.el[isAbove ? 'addCls': 'removeCls'](picker.baseCls + aboveSfx);  
            }  
        }  
    }  
});  