Ext.define("somnus.controller.management.RoleController",{
	extend: 'somnus.common.base.BaseController',
	stores: ['management.RoleStore','management.RoleGrantTreeStore'],
	models: ['management.RoleModel','management.ResourceModel'],
	views: ['management.RoleView', 'management.RoleWindow','management.RoleGrant'],
	refs: [
	       {ref: 'roleView', selector: 'roleView'},
	       {ref: 'roleWindow', selector: 'roleWindow', xtype: 'roleWindow'},
	       {ref: 'roleGrant', selector: 'roleGrant', xtype: 'roleGrant'}
	],
	init:function(){
		this.control({
			'roleGrant treepanel':{
				checkchange:function(node,checked,options){
					if(node.data.leaf == false){
						if(checked){
							node.expand();
							node.updateInfo(true,{checked:true});
							node.eachChild(function(n){
								n.data.checked = true;
								n.updateInfo(true,{checked:true});
							})
						}else{
							node.expand();
							node.eachChild(function(n){
								n.data.checked = false;
								n.updateInfo(true,{checked:false});
							})
						}
					}else{
						if(!checked){
							node.parentNode.data.checked = false;
							node.parentNode.updateInfo(true,{checked:false});
						}
					}
				},
				afterrender:function(treepanel, eOpts){
					var self = this;
					if(!treepanel.getStore().isLoading())
						treepanel.getStore().load();
					treepanel.getStore().on('load',function(treestore, node, records, successful, eOpts){
						Ext.Ajax.request({
							url:app.contextPath + '/base/syresource!doNotNeedSecurity_getRoleResources.action',
							params:{id : self.getRoleGrant().pk},
							timeout:2000,
							success:function(response,option){
								var result = Ext.decode(response.responseText);
								Ext.each(result,function(record){
									var node = treestore.getNodeById(record.id);
									node.data.checked = true;
									node.updateInfo(true,{checked:true});
								});
							}
						});
					});
				}
			},
			'roleGrant button[action=grant]':{
				click:function(){
					var self = this;
					var checkedNodes = this.getRoleGrant().down('treepanel').getChecked();
					var pks = [];
					Ext.Array.each(checkedNodes, function (node) {
						pks.push(node.get('id'));
					});
					Ext.Ajax.request({
						url:app.contextPath + '/base/syrole!grant.action',
						params:{id:self.getRoleGrant().pk,ids : pks.join(',')},
						timeout:2000,
						success:function(response,option){
							var result = Ext.decode(response.responseText);
							if(result.success){
								self.getRoleGrant().close();
								Ext.Msg.show({
									title: '信息',
									msg: '授权成功！',
									buttons: Ext.Msg.OK,
									icon: Ext.Msg.INFO
								});
							}
						}
					});
				}
			},
			'roleView toolbar button[action=add]':{
				click:function(b,e){
					Ext.create('somnus.view.management.RoleWindow', {
						isQuery:false,
			            listeners: {
			                success: function () {
			                    this.getRoleView().getStore().load();
			                },
			                scope: this
			            }
			        }).show();
				}
			},
			'roleView actioncolumn':{
				showclick: function(record){
					Ext.create('somnus.view.management.RoleWindow', {
			            pk: record.record.data.id
			        }).show();
				},
				editclick: function(record){
					Ext.create('somnus.view.management.RoleWindow', {
			            pk: record.record.data.id,
			            isQuery:false,
			            listeners: {
			                success: function () {
			                    this.getRoleView().getStore().load();
			                },
			                failure: function () {
			                    this.getRoleView().close();
			                    this.getRoleView().getStore().load();
			                },
			                scope: this
			            }
			        }).show();
				},
				deleteclick: function(record){
					var grid = this.getRoleView();
			        var id = record.record.data.id;
			        grid.doDelete(grid, id);
				},
				grantclick: function(record){
					Ext.create('somnus.view.management.RoleGrant', {
			            pk: record.record.data.id
			        }).show();
				}
			}
		})
	}
});