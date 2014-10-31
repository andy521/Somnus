Ext.define('App.view.OrganizationView',{
	extend:'Ext.tree.Panel',
	alias:'widget.organizationview',
	rootVisible:false,
	store:'OrganizationStore',
	columns:[Ext.create("Ext.grid.RowNumberer",{}),{
		xtype : 'treecolumn',
		text : '机构名称',
		dataIndex : 'name',
		width : 200
	},{
		text : '图标名称',
		dataIndex : 'iconCls',
		width : 200
	},{
		text : '机构编码',
		dataIndex : 'code',
		width : 200
	},{
		text : '机构地址',
		dataIndex : 'address',
		width : 200
	},{
		text : '创建时间',
		dataIndex : 'createdatetime',
		width : 150,
		hidden : true,
		sortable : true
	},{
		text : '修改时间',
		dataIndex : 'updatedatetime',
		width : 150,
		hidden : true,
		sortable : true
	},{
		text : '排序',
		dataIndex : 'seq',
		width : 80,
		hidden : true
	},{
		text : '操作',
		xtype : 'actioncolumn',
		dataIndex : 'action',
		width : 60,
		items:[{
			iconCls:'ext-icon-note',
			tooltip:'查看'
		},{
			iconCls:'ext-icon-note_edit',
			tooltip:'编辑'
		},{
			iconCls:'ext-icon-note_delete',
			tooltip:'删除'
		}]
	}],
	dockedItems:[{
		xtype : 'toolbar',
		dock : 'top',
		items:[{
			xtype:'button',
			id:'addorganization',
			text:'添加',
			iconCls:'ext-icon-note_add'
		},{
			xtype:'button',
			id:'allopenorg',
			text:'展开',
			iconCls:'ext-icon-resultset_next'
		},{
			xtype:'button',
			id:'allcloseorg',
			text:'折叠',
			iconCls:'ext-icon-resultset_previous'
		},{
			xtype:'button',
			id:'refreshorg',
			text:'刷新',
			iconCls:'ext-icon-arrow_refresh'
		}]
	}],
	viewConfig:{
		forceFit:true,
		loadMask:true,
		stripeRows:true
	}
})