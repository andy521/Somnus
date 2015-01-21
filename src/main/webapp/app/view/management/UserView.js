Ext.define('somnus.view.management.UserView',{
	extend: 'somnus.common.base.BaseGrid',
	alias: 'widget.userView',
	title: '用户管理',
	frame: true,
	autoQuery: true,
	initComponent: function () {
		Ext.apply(this, {
			iconCls:'ext-icon-user_suit',
			store: 'management.UserStore',
			multiSelect: true,
			autoQuery: true,
			selModel: {
				selType: 'checkboxmodel'
			},
			forceFit: true,
			columns:[{
				text : '照片',
				dataIndex : 'photo',
				width : 40,
				renderer:function(value){
					return Ext.String.format("<img width='24' height='24' src='{0}{1}' />",app.contextPath,value);
				}
			},{
				text : '登录名',
				dataIndex : 'loginname',
				width : 100
			},{
				text : '姓名',
				dataIndex : 'name',
				width : 100
			},{
				text : '创建时间',
				dataIndex : 'createdatetime',
				width : 150
			},{
				text : '修改时间',
				dataIndex : 'updatedatetime',
				width : 150
			},{
				text:'性别',
				dataIndex:'sex',
				renderer:function(value){
					switch (value){
						case '0':
							return Ext.String.format("<span style='color:green;font-weight:bold;'>女</span><img src='{0}/style/images/ext_icons/user/user_female.png' />",app.contextPath);
						case '1':
							return Ext.String.format("<span style='color:red;font-weight:bold;'>男</span><img src='{0}/style/images/ext_icons/user/user_suit.png' />",app.contextPath);
					}
				}
			},{
				text : '年龄',
				dataIndex : 'age',
				width : 80,
				hidden : true
			},{
				text : '操作',
				xtype : 'actioncolumn',
				dataIndex : 'action',
				width : 80,
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
					iconCls:'ext-icon-user',
					action:'grantRole',
					tooltip:'用户角色',
					handler: function(grid, rowIndex, colIndex, item) {
						var rec = grid.getStore().getAt(rowIndex);  
						this.fireEvent('grantRoleclick', {  
							record: rec  
						});
					}
				},{
					iconCls:'ext-icon-group',
					action:'grantOrg',
					tooltip:'用户机构',
					handler: function(grid, rowIndex, colIndex, item) {
						var rec = grid.getStore().getAt(rowIndex);  
						this.fireEvent('grantOrgclick', {  
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
					xtype:'textfield',
					name:'QUERY_t#loginname_S_LK',
					fieldLabel:'登录名',
					labelWidth : 50,
					width: 200
				},{
					xtype:'textfield',
					name:'QUERY_t#name_S_LK',
					fieldLabel:'姓名',
					labelWidth : 50,
					width: 200
				},{
					xtype : 'combo',
					fieldLabel : '性别',
					labelWidth : 50,
					width: 150,
					name:'QUERY_t#sex_S_EQ',
					store : {
						fields:[{name:'text',type:'string'},{name:'value',type:'string'}],
						data:[{text:'男',value:'1'},{text:'女',value:'0'}]
					},
					valueField : 'value',
					displayField : 'text',
					queryMode : 'local',
					emptyText:'请选择'
				},'创建时间',{
					xtype: 'daterange',
					itemId: 'daterange',
					startDateName:'QUERY_t#createdatetime_D_GE',
					endDateName:'QUERY_t#createdatetime_D_LE',
		        	range: '-1d'
				},{
					xtype:'btnsearch',
					store: 'management.UserStore',
					paramName:['QUERY_t#loginname_S_LK','QUERY_t#name_S_LK','QUERY_t#sex_S_EQ','QUERY_t#createdatetime_D_GE','QUERY_t#createdatetime_D_LE'],
					text:'过滤'
				}]
			}]
		});
		this.callParent(arguments);
	}
});