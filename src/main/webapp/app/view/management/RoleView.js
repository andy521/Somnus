Ext.define('somnus.view.management.RoleView',{
	extend: 'somnus.common.base.BaseGrid',
	alias: 'widget.roleView',
	title: '角色管理',
	frame: true,
	autoQuery: true,
	initComponent: function () {
		Ext.apply(this, {
			width: 680,
			height: 350,
			store: 'management.RoleStore',
			multiSelect: true,
			autoQuery: true,
			selModel: {
				selType: 'checkboxmodel'
			},
			forceFit: true,
			columns:[{
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
					action:'show',
					tooltip:'查看',
					handler: function(grid, rowIndex, colIndex, item) {  
						var rec = grid.getStore().getAt(rowIndex);
						this.fireEvent('showclick', {  
							record: rec  
						});
					}
				},{
					iconCls:'ext-icon-note_edit',
					action:'edit',
					tooltip:'编辑',
					handler: function(grid, rowIndex, colIndex, item) {  
						var rec = grid.getStore().getAt(rowIndex);  
						this.fireEvent('editclick', {  
							record: rec  
						});
					}
				},{
					iconCls:'ext-icon-key',
					action:'auth',
					tooltip:'授权',
					handler: function(grid, rowIndex, colIndex, item) {
						var rec = grid.getStore().getAt(rowIndex);  
						this.fireEvent('authclick', {  
							record: rec  
						});
					}
				},{
					iconCls:'ext-icon-note_delete',
					action:'delete',
					tooltip:'删除',
					handler: function(grid, rowIndex, colIndex, item) {
						var rec = grid.getStore().getAt(rowIndex);  
						this.fireEvent('deleteclick', {  
							record: rec  
						});
					}
				}]
			}],
			dockedItems:[{
				xtype : 'toolbar',
				dock : 'top',
				items:[{
					xtype:'button',
					action:'add',
					text:'添加',
					iconCls:'ext-icon-note_add'
				},'-',{
					xtype:'searchfield',
					paramName:'QUERY_t#name_S_LK',
					store: 'management.RoleStore',
					emptyText:'搜索角色名称'
				},{
					xtype:'emptysearch',
					store: 'management.RoleStore'
				}]
			}]
		});
		this.callParent(arguments);
	}
});