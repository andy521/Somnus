Ext.define('somnus.view.management.OrganizationWindow',{
	extend: 'somnus.common.base.BaseForm',
    alias: 'widget.organizationWindow',
    title: '机构信息',
    baseUrl: 'organization',
    initComponent: function () {
    	var me = this;
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
            	xtype : 'textfield',
				fieldLabel : '编号',
				name:'data.id',
				readOnly:true,
				width:280
            },{
            	xtype : 'textfield',
				fieldLabel : '机构名称',
				name:'data.name',
				vtype: 'unique',
                vtypeEntity: 'Organization',
                allowBlank:false,
				width:280
            },{
            	xtype : 'textfield',
				fieldLabel : '机构编码',
				name:'data.code',
				vtype: 'unique',
                vtypeEntity: 'Organization',
                allowBlank:false,
				width:280
            },{
            	xtype : 'numberfield',
				fieldLabel : '顺序',
				name:'data.seq',
				width:280,
				value:100
            },{
            	xtype : 'treepicker',
				fieldLabel : '上级机构',
				name:'data.syorganization.id',
				store:'management.OrgComboTreeStore',
				allowBlank:false,
				width:280
            },{
            	xtype : 'imagebrowse',
				fieldLabel : '机构图标',
				name:'data.iconCls',
				buttonText: '',
	            buttonConfig: {
	                iconCls: 'ext-icon-camera'
	            },
	            url:app.contextPath + '/jsp/icons.jsp',
	            buttons:[{
					text:'确定',
					handler:function(btn){
						selectIcon(btn.ownerCt.ownerCt,me.down('form').getForm().findField('data.iconCls'));
					}
				}],
				width:280
            },{
            	xtype : 'textfield',
				fieldLabel : '机构地址',
				name:'data.address',
				allowBlank:false,
				width:280
            }]
        });

        this.items = [this.formPanel];

        this.callParent();
    }
});