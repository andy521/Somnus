// 主页面
Ext.define('somnus.view.Viewport', {
	extend: 'Ext.container.Viewport',
	layout: 'border',
	initComponent: function () {
		var headerPanel = Ext.create('Ext.panel.Panel', {
			region: 'north',
			border:false,
			height: 100,
			bodyStyle:'background-color:#3992D4',
			items:[{
				xtype:'container',
				style:{
					position:'absolute',
					right:'30px',
					top:'5px',
					width:'150px'
				},
				html:'<font style="font-size:15px;float:right;">'+Ext.String.format('欢迎您，{0}',app.loginname)+'</font>'
			},{
				xtype:'container',
				style:{
					position:'absolute',
					left:'18px',
					top:'0px',
					width:'155px'
				},
				html:Ext.String.format('<img src="{0}/style/images/logo-screen-noglow.png"/>',app.contextPath)
			}],
			dockedItems:[{
				xtype : 'toolbar',
				dock : 'bottom',
				border:false,
				height:30,
				style:{
					background:'#3992D4'
				},
				layout : {
					align:'right'
				},
				items:['->',{
					iconCls:'ext-icon-rainbow',
					text : '<font color="#FFF">更换皮肤</font>',
					style:{
			        	background:'#3992D4',
			        	border:0
			        },
			        action:'changeTheme',
			        menu:{
			        	xtype: 'menu',
			        	items:[{
			        		xtype:'menucheckitem',
							group:'theme',
							text: '海王星',
							checked:true,
							css:'ext-all-neptune.css',
							listeners:{
								checkchange:function(item, checked, eOpts){
									var link = Ext.getDom('extTheme');
									var href = link.getAttribute('href');
									var lastg = href.lastIndexOf('/')+1;
									var oldcss = href.substring(lastg);
									var newcss = item.css;
									if(oldcss != newcss){
										href = href.substring(0,lastg)+newcss;
										link.setAttribute('href',href);
										$.cookie("extTheme", newcss,{expires : 7});
									}
								}
							}
			        	},{
			        		xtype:'menucheckitem',
			        		group:'theme',
			        		text: '经典蓝',
			        		css:'ext-all.css',
			        		listeners:{
								checkchange:function(item, checked, eOpts){
									var link = Ext.getDom('extTheme');
									var href = link.getAttribute('href');
									var lastg = href.lastIndexOf('/')+1;
									var oldcss = href.substring(lastg);
									var newcss = item.css;
									if(oldcss != newcss){
										href = href.substring(0,lastg)+newcss;
										link.setAttribute('href',href);
										$.cookie("extTheme", newcss,{expires : 7});
									}
								}
							}
			        	}]
			        },
			        listeners:{
			        	render:function(btn, eeOpts){
							var extTheme = $.cookie("extTheme");
							var items = btn.menu.items.items;
							Ext.each(items,function(item){
								if(item.css==extTheme){
									item.setChecked(true);
									return;
								}
							});
						}
			        }
				},{
					iconCls:'ext-icon-cog',
					text : '<font color="#FFF">控制面板</font>',
					style:{
			        	background:'#3992D4',
			        	border:0
			        },
			        menu : {
			    		xtype: 'menu',
						items : [{
								xtype:'menuitem',
								id:'updatepwd',
								text: '修改密码',
								iconCls:'ext-icon-user_edit',
								handler:function(){
									Ext.require('somnus.view.system.user.UpdatePwdWindow', function () {
										Ext.create('somnus.view.system.user.UpdatePwdWindow').show();
									});
								}
							},{
								xtype:'menuitem',
								id:'showmine',
								text: '我的信息',
								iconCls:'ext-icon-user',
								handler:function(){
									Ext.require('somnus.view.system.user.UserInfoWindow', function () {
										Ext.create('somnus.view.system.user.UserInfoWindow').show();
									});
								}
							}]
					}
				},{
					iconCls:'ext-icon-disconnect',
			    	text : '<font color="#FFF">注销</font>',
			    	style:{
			        	background:'#3992D4',
			        	border:0
			        },
			    	menu : {
			    		xtype: 'menu',
			    		items:[{
			    			xtype:'menuitem',
			    			id:'lockwindow',
							text: '锁定窗口',
							iconCls:'ext-icon-lock',
							handler:function(){
								Ext.Ajax.request({
									url:app.contextPath + '/base/syuser!doNotNeedSessionAndSecurity_logout.action',
									success:function(response,option){
										Ext.require('somnus.view.system.user.LockWindow', function () {
											Ext.create('somnus.view.system.user.LockWindow').show();
										});
									}
								});
							}
			    		},{
			    			xtype:'menuitem',
			    			id:'existsys',
							text: '退出系统',
							iconCls:'ext-icon-door_out',
							handler:function(){
								Ext.Ajax.request({
									url:app.contextPath + '/base/syuser!doNotNeedSessionAndSecurity_logout.action',
									success:function(response,option){
										location.replace(app.contextPath + '/index.jsp'); 
									}
								});
							}
			    		}]
			    	}
				}]
			}]
		});
		var footPanel = Ext.create('Ext.panel.Panel', {
			region: 'south',
			split: true,
			height: 32,
			html: '<p><span style="text-align:center;display:block;padding :10 0"> 版权所有@<a href="mailto:928200207@qq.com">Somnus</a></span></p>',
			border: false
		});
		var tabPanel = Ext.create('Ext.tab.Panel', {
			id: 'tabPanel',
			region: 'center',
			plugins: Ext.create('Ext.ux.TabCloseMenu', {
				closeTabText: '关闭当前',
				closeOthersTabsText: '关闭其他',
				closeAllTabsText: '关闭所有'
			}),
			border: false,
			activeTab:0,
			items:[{
				xtype:'panel',
				layout:'fit',
				title : '欢迎使用',
				iconCls:'ext-icon-heart',
				bodyStyle : 'padding:0px',
				html:Ext.String.format('<iframe src="{0}/jsp/welcome.jsp" allowTransparency="true" style="border: 0; width: 100%; height: 99%;" frameBorder="0"></iframe>' , app.contextPath)
			}],
			listeners: {
				remove: function (tab, component, eOpts) {
					component.close();
				},
				scope: this
			}
		});
		var menuPanel = Ext.create('Ext.panel.Panel', {
			layout: 'fit',
			region: 'west',
			title: '菜单',
			split: true,
			width: 240
		});
		var store = Ext.create('Ext.data.TreeStore', {
			fields: ['url', 'text', 'target'],
			proxy:{
				type:'ajax',
				url:app.contextPath + '/base/syresource!doNotNeedSecurity_getMainMenu.action',
				reader:"json",
				extractResponseData: function(response) {
		              var json = Ext.loadFilter(Ext.JSON.decode(response.responseText),{parentField : 'pid'});
		              Ext.each(json,function(record){
		            	  if(Ext.isEmpty(record.children)){
		            		  record.expanded = false;
		            		  record.leaf = true;
		            	  }else{
		            		  record.expanded = true;
		            	  }
		              });
		              response.responseText = Ext.JSON.encode(json);
		              return response  
		          }
			},
			autoLoad: true
		});
		var treePanel = Ext.create('Ext.tree.Panel', {
			width: 200,
			height: 150,
			store: store,
			rootVisible: false,
			listeners: {
				itemclick: function (view, record, item, index, e, options) {
					var url = record.get('url');
					if (Ext.isEmpty(url)) {
						Ext.Msg.alert("提示", "正在开发中...");
						return;
					}
					var controllerName = url.replace('somnus.controller.', '');
					Ext.require(url, function () {
						var component = somnus.app.getController(controllerName).getViewInstance();
						if (!tabPanel.getComponent(component.id)) {
							tabPanel.add(component)
						}
						tabPanel.setActiveTab(component);
						tabPanel.doLayout();
					}, this);
				},
				scope: this
			}
		});
		treePanel.expandAll();
		menuPanel.add(treePanel)
		this.items = [ headerPanel,menuPanel,tabPanel,footPanel];
		tabPanel.doLayout();
		this.callParent();
	}
});
