Ext.define('somnus.view.management.RoleWindow', {
    extend: 'somnus.common.base.BaseForm',
    alias: 'widget.roleWindow',
    title: '角色信息',
    baseUrl: 'role',
    initComponent: function () {

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyStyle: 'padding: 5px 10px',
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 80,
                anchor: '100%'
            },
            trackResetOnLoad: true,
            items: [{
            	xtype: 'hidden',
        		itemId:'data.id',
                name: 'data.id'
            },{
            	xtype : 'textfield',
				fieldLabel : '角色名称',
				name:'data.name',
				vtype: 'unique',
                vtypeEntity: 'Role',
                allowBlank:false,
				width:280
            },{
            	xtype : 'numberfield',
				fieldLabel : '顺序',
				name:'data.seq',
				width:280,
				value:100
            },{
            	xtype : 'textarea',
				fieldLabel : '角色描述',
				name:'data.description',
				width:280
            }]
        });

        this.items = [this.formPanel];

        this.callParent();
    }
});
