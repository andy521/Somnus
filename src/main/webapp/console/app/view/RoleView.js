Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('App',app.basePath+'/console/app');
Ext.require([
    'App.apply.SearchField', 
    'App.apply.EmptySearch'
]);
Ext.define('App.view.RoleView',{
	extend:'Ext.grid.Panel',
	alias:'widget.roleview',
	store:'RoleStore',
	columns:[Ext.create("Ext.grid.RowNumberer",{}),{
		text : '角色名称',
		dataIndex : 'name',
		width : 200
	},{
		text : '创建时间',
		dataIndex : 'createdatetime',
		width : 150,
		sortable : true
	},{
		text : '修改时间',
		dataIndex : 'updatedatetime',
		width : 150,
		sortable : true
	},{
		text : '资源描述',
		dataIndex : 'description',
		width : 400
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
			iconCls:'ext-icon-key',
			tooltip:'授权'
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
			id:'addrole',
			text:'添加',
			iconCls:'ext-icon-note_add'
		},'-',{
			xtype:'searchfield',
			paramName:'QUERY_t#name_S_LK',
			store: 'RoleStore',
			emptyText:'搜索角色名称'
		},{
			xtype:'emptysearch',
			store: 'RoleStore'
		}]
	},{
		xtype:'pagingtoolbar',
		store: 'RoleStore',
		dock :'bottom',
		displayInfo: true
}],
	viewConfig:{
		forceFit:true,
		loadMask:true,
		stripeRows:true
	}
})