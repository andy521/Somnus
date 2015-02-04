Ext.define("somnus.controller.management.UserController",{
	extend: 'somnus.common.base.BaseController',
	stores: ['management.UserStore','management.UserOrgTreeStore'],
	models: ['management.UserModel'],
	views: ['management.UserView', 'management.UserWindow','management.UserOrgGrant'],
	refs: [
	       {ref: 'userView', selector: 'userView'},
	       {ref: 'userWindow', selector: 'userWindow', xtype: 'userWindow'},
	       {ref: 'userOrgGrant', selector: 'userOrgGrant', xtype: 'userOrgGrant'}
	],
	init:function(){
		this.control({
			'userView toolbar button[action=add]':{
				click:function(b,e){
					Ext.create('somnus.view.management.UserWindow', {
						isQuery:false,
			            listeners: {
			                success: function () {
			                    this.getUserView().getStore().load();
			                },
			                scope: this
			            }
			        }).show();
				}
			},
			'userOrgGrant treepanel':{
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
							url:app.contextPath + '/base/syorganization!doNotNeedSecurity_getSyorganizationByUserId.action',
							params:{id : self.getUserOrgGrant().pk},
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
			'userOrgGrant button[action=grant]':{
				click:function(){
					var self = this;
					var checkedNodes = this.getUserOrgGrant().down('treepanel').getChecked();
					var pks = [];
					Ext.Array.each(checkedNodes, function (node) {
						pks.push(node.get('id'));
					});
					Ext.Ajax.request({
						url:app.contextPath + '/base/syuser!grantOrganization.action',
						params:{id:self.getUserOrgGrant().pk,ids : pks.join(',')},
						timeout:2000,
						success:function(response,option){
							var result = Ext.decode(response.responseText);
							if(result.success){
								self.getUserOrgGrant().close();
								Ext.Msg.show({
									title: '信息',
									msg: '修改成功！',
									buttons: Ext.Msg.OK,
									icon: Ext.Msg.INFO
								});
							}
						}
					});
				}
			},
			'userView actioncolumn':{
				showclick: function(record){
					Ext.create('somnus.view.management.UserWindow', {
			            pk: record.record.data.id
			        }).show();
				},
				editclick: function(record){
					Ext.create('somnus.view.management.UserWindow', {
			            pk: record.record.data.id,
			            isQuery:false,
			            listeners: {
			                success: function () {
			                    this.getUserView().getStore().load();
			                },
			                failure: function () {
			                    this.getUserView().close();
			                    this.getUserView().getStore().load();
			                },
			                scope: this
			            }
			        }).show();
				},
				grantRoleclick: function(record){
					Ext.create('somnus.view.management.UserRoleGrant', {
			            pk: record.record.data.id
			        }).show();
				},
				grantOrgclick: function(record){
					Ext.create('somnus.view.management.UserOrgGrant', {
			            pk: record.record.data.id
			        }).show();
				},
				deleteclick: function(record){
					var grid = this.getUserView();
			        var id = record.record.data.id;
			        grid.doDelete(grid, id);
				}
			}
		})
	}
});