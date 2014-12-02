Ext.define('somnus.view.management.ResourceView',{
	extend: 'somnus.common.base.BaseTreeGrid',
	alias: 'widget.resourceView',
	title: '资源管理',
	frame: true,
	autoQuery: false,
	initComponent: function () {
		Ext.apply(this, {
			iconCls:'ext-icon-newspaper_link',
			store: 'management.ResourceStore',
			autoQuery: false,
			forceFit: true,
			columns:[{
				xtype : 'treecolumn',
				text : '资源名称',
				dataIndex : 'name',
				width : 200
			},{
				text : '图标名称',
				dataIndex : 'iconCls',
				width : 200
			},{
				text : '资源路劲',
				dataIndex : 'url',
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
				text : '资源类型',
				dataIndex : 'typeName',
				width : 100,
				renderer:function(r,mateData,record,rowIndex,colIndex,store,view){
					console.log(record.getType().get('typeName'));
				}
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
				text : '目标',
				dataIndex : 'target',
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
				},{
					xtype:'button',
					action:'allopen',
					text:'展开',
					iconCls:'ext-icon-resultset_next'
				},{
					xtype:'button',
					action:'allclose',
					text:'折叠',
					iconCls:'ext-icon-resultset_previous'
				},{
					xtype:'button',
					action:'refresh',
					text:'刷新',
					iconCls:'ext-icon-arrow_refresh'
				}]
			}]
		});
		this.callParent(arguments);
	}
});