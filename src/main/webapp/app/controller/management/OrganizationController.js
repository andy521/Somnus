Ext.define("somnus.controller.management.OrganizationController",{
	extend: 'somnus.common.base.BaseController',
	stores: ['management.OrgStore','management.OrgComboTreeStore','management.OrgResourceTreeStore'],
	models: ['management.OrganizationModel','management.ResourceModel'],
	views: ['management.OrganizationView', 'management.OrganizationWindow','management.OrganizationGrant'],
	refs: [
	       {ref: 'organizationView', selector: 'organizationView'},
	       {ref: 'organizationWindow', selector: 'organizationWindow', xtype: 'organizationWindow'},
	       {ref: 'organizationGrant', selector: 'organizationGrant', xtype: 'organizationGrant'}
	],
	init:function(){
		this.control({
			'organizationView toolbar button[action=allopen]':{
				click:function(b,e){
					var tree = b.ownerCt.ownerCt;
					tree.expandAll();
				}
			},
			'organizationView toolbar button[action=allclose]':{
				click:function(b,e){
					var tree = b.ownerCt.ownerCt;
					tree.collapseAll();
				}
			},
			'organizationView toolbar button[action=refresh]':{
				click:function(b,e){
					var tree = b.ownerCt.ownerCt;
					tree.getStore().reload();
				}
			},
			'organizationGrant treepanel':{
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
					console.log(self);
					if(!treepanel.getStore().isLoading())
						treepanel.getStore().load();
					treepanel.getStore().on('load',function(treestore, node, records, successful, eOpts){
						Ext.Ajax.request({
							url:app.contextPath + '/base/resource!doNotNeedSecurity_getOrganizationResources.action',
							params:{id : self.getOrganizationGrant().pk},
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
			'organizationGrant button[action=grant]':{
				click:function(){
					var self = this;
					var checkedNodes = this.getOrganizationGrant().down('treepanel').getChecked();
					var pks = [];
					Ext.Array.each(checkedNodes, function (node) {
						pks.push(node.get('id'));
					});
					Ext.Ajax.request({
						url:app.contextPath + '/base/organization!grant.action',
						params:{id:self.getOrganizationGrant().pk,ids : pks.join(',')},
						timeout:2000,
						success:function(response,option){
							var result = Ext.decode(response.responseText);
							if(result.success){
								self.getOrganizationGrant().close();
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
			'organizationView toolbar button[action=add]':{
				click:function(b,e){
					Ext.create('somnus.view.management.OrganizationWindow', {
						isQuery:false,
			            listeners: {
			                success: function () {
			                    this.getOrganizationView().getStore().load();
			                },
			                scope: this
			            }
			        }).show();
				}
			},
			'organizationView actioncolumn':{
				showclick: function(record){
					Ext.create('somnus.view.management.OrganizationWindow', {
			            pk: record.record.data.id
			        }).show();
				},
				editclick: function(record){
					Ext.create('somnus.view.management.OrganizationWindow', {
			            pk: record.record.data.id,
			            isQuery:false,
			            listeners: {
			                success: function () {
			                    this.getOrganizationView().getStore().load();
			                },
			                failure: function () {
			                    this.getOrganizationView().close();
			                    this.getOrganizationView().getStore().load();
			                },
			                scope: this
			            }
			        }).show();
				},
				deleteclick: function(record){
					var grid = this.getOrganizationView();
			        var id = record.record.data.id;
			        grid.doDelete(grid, id);
				},
				grantclick: function(record){
					Ext.create('somnus.view.management.OrganizationGrant', {
			            pk: record.record.data.id
			        }).show();
				}
			}
		})
	}
});