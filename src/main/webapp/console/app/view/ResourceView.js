Ext.define('App.view.ResourceView',{
	extend:'Ext.tree.Panel',
	alias:'widget.resourceview',
	rootVisible:false,
	store:'ResourceStore',
	columns:[Ext.create("Ext.grid.RowNumberer",{}),{
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
		dataIndex : 'syresourcetype',
		width : 100,
		renderer:function(value){
			return value.name;
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
			id:'noteresource',
			tooltip:'查看',
			handler: function(grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                var win = Ext.create('App.view.ResourceWindow',{
					title : '查看资源信息',
					iconCls:'ext-icon-note'
				}).show();
				win.down('form').getForm().load({
					waitMsg : '正在加载数据请稍后',         
					waitTitle : '提示',             
					url : app.contextPath + '/base/syresource!getById.action',  
					params:{id:rec.get('id')},                
					method:'POST', 
					success:function(form,action){
						win.down('form').getForm().setValues({
							'data.id':action.result.data.id,
							'data.url':action.result.data.url,
							'data.syresource.id':action.result.data.syresource?action.result.data.syresource.name:'',
							'data.seq':action.result.data.seq,
							'data.description':action.result.data.description,
							'data.name':action.result.data.name,
							'data.syresourcetype.id':action.result.data.syresourcetype.name,
							'data.iconCls':action.result.data.iconCls,
							'data.target':action.result.data.target
                        });
						$(win.down('form').getForm().findField('data.iconCls').getEl().query('input')).addClass(action.result.data.iconCls);
                    }
				});
            }
		},{
			iconCls:'ext-icon-note_edit',
			tooltip:'编辑',
			handler: function(grid, rowIndex, colIndex, item) {
				var record = grid.getStore().getAt(rowIndex);
                var win = Ext.create('App.view.ResourceWindow',{
					title : '编辑资源信息',
					iconCls:'ext-icon-note',
					buttons:[{
						text:'编辑',
						handler:function(btn){
							win.down('form').getForm().submit({
								url:app.contextPath + '/base/syresource!update.action',
								params:win.down('form').getForm().getValues(),
								success:function(form, action)
								{
									if(action.result.success){
										 grid.getStore().treeStore.reload();
										 grid.ownerCt.ownerCt.ownerCt.child('panel treepanel').getStore().reload();
										 btn.ownerCt.ownerCt.close();
										 Ext.create('App.util.Notification', {
												position: 't',
												cls: 'ux-notification-light',
												closable: true,
												title: '提示信息',
												width:'400px',
												autoCloseDelay: 3000,
												iconCls: 'ux-notification-icon-information',
												slideBackDuration: 500,
												slideInAnimation: 'bounceOut',
												slideBackAnimation: 'easeIn',
												html: '修改资源成功'
											}).show();
									}else{
										button.enable();
										mask.hide();
										Ext.Msg.show({
											title : '错误提示',
											msg : action.result.msg,
											buttons : Ext.Msg.OK,
											icon : Ext.Msg.ERROR
										});
									}
								}
							});
						}
					}]
				}).show();
				win.down('form').getForm().load({
					waitMsg : '正在加载数据请稍后',         
					waitTitle : '提示',             
					url : app.contextPath + '/base/syresource!getById.action',  
					params:{id:record.get('id')},                
					method:'POST', 
					success:function(form,action){
						console.log(action.result.data);
						win.down('form').getForm().setValues({
							'data.id':action.result.data.id,
							'data.url':action.result.data.url,
							'data.syresource.id':action.result.data.syresource?action.result.data.syresource.id:'',
							'data.seq':action.result.data.seq,
							'data.description':action.result.data.description,
							'data.name':action.result.data.name,
							'data.syresourcetype.id':action.result.data.syresourcetype?action.result.data.syresourcetype.id:'',
							'data.iconCls':action.result.data.iconCls,
							'data.target':action.result.data.target
                        });
						$(win.down('form').getForm().findField('data.iconCls').getEl().query('input')).addClass(action.result.data.iconCls);
                    }
				});
             }
		},{
			iconCls:'ext-icon-note_delete',
			tooltip:'删除',
			handler: function(grid, rowIndex, colIndex, item) {
				var st = grid.getStore();
				var record = grid.getStore().getAt(rowIndex);
				Ext.Msg.confirm('确认删除', '你确定删除吗', function(btn)
				{
					if (btn == 'yes') 
					{
						//后台操作
						Ext.Ajax.request({
							url:app.contextPath + '/base/syresource!delete.action',
							params:{id:record.get('id')},
							method:"POST",
							timeout:2000,
							success:function(response,opts)
							{//前端删除
								st.remove(record);
								st.reload();
								grid.ownerCt.ownerCt.ownerCt.child('panel treepanel').getStore().reload();
								Ext.Msg.show({
									title : '信息提示',
									msg : '删除成功!',
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
							},
							failure:function()
							{
								Ext.Msg.show({
									title : '错误提示',
									msg : '删除时发生错误!',
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.ERROR
								})
							}
						});
					}
				});
             }
		}]
	}],
	dockedItems:[{
		xtype : 'toolbar',
		dock : 'top',
		items:[{
			xtype:'button',
			id:'addresource',
			text:'添加',
			iconCls:'ext-icon-note_add'
		},{
			xtype:'button',
			id:'allopenresource',
			text:'展开',
			iconCls:'ext-icon-resultset_next'
		},{
			xtype:'button',
			id:'allcloseresource',
			text:'折叠',
			iconCls:'ext-icon-resultset_previous'
		},{
			xtype:'button',
			id:'refreshresource',
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