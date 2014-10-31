Ext.define("App.controller.NorthController",{
	extend:'Ext.app.Controller',
	init:function(){
		this.control({
			/*
			 * 弹出修改密码
			 */
			'northview menuitem[id=updatepwd]':{
				click:function(e, eOpts){
					Ext.create('App.view.UpdatePwd',{}).show();
				}
			},
			/*
			 * 我的信息
			 */
			'northview menuitem[id=showmine]':{
				click:function(e, eOpts){
					Ext.create('App.view.UserInfoWindow',{}).show();
				}
			},
			/*
			 * 锁定窗口
			 */
			'northview menuitem[id=lockwindow]':{
				click:function(e, eOpts){
					Ext.Ajax.request({
						url:app.contextPath + '/base/syuser!doNotNeedSessionAndSecurity_logout.action',
						success:function(response,option){
							Ext.create('App.view.LockWindow',{}).show();
						}
					});
				}
			},
			/*
			 * 退出系统
			 */
			'northview menuitem[id=existsys]':{
				click:function(e, eOpts){
					Ext.Ajax.request({
						url:app.contextPath + '/base/syuser!doNotNeedSessionAndSecurity_logout.action',
						success:function(response,option){
							location.replace(app.contextPath + '/index.jsp'); 
						}
					});
				}
			},
			'northview button[action=changeTheme]':{
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
			},
			'northview menucheckitem[group=theme]':{
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
					Ext.getCmp('main').doComponentLayout();
					Ext.getCmp('main').down('panel').doComponentLayout();
					Ext.getCmp('main').down('tabpanel').doComponentLayout();
					Ext.getCmp('main').down('panel').down('northview').doComponentLayout();
					Ext.getCmp('main').down('panel').down('northview').down('toolbar').doComponentLayout();
				}
			},
			/*
			 * 解锁登陆
			 */
			'lockwindow button[text=登陆]':{
				click:function(button){
					var form = button.ownerCt.ownerCt.items.first().getForm();
					if(form.isValid()){
						button.disable();
						Ext.Ajax.request({
							url:app.contextPath + '/base/syuser!doNotNeedSessionAndSecurity_login.action',
							params:{'data.loginname':form.findField('data.loginname').getValue(),'data.pwd':form.findField('data.pwd').getValue()},
							success:function(response,option)
							{
								var res = Ext.JSON.decode(response.responseText);
								if(res.success){
									button.ownerCt.ownerCt.hide();
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
										html: '解锁成功'
									}).show();
								}else{
									button.enable();
									Ext.Msg.show({
										title : '错误提示',
										msg : res.msg,
										buttons : Ext.Msg.OK,
										icon : Ext.Msg.ERROR
									});
								}
							}
						});
					}
				}
			},
			/*
			 * 修改密码
			 */
			'updatepwd button[text=修改]':{
				click:function(button){
					var form = button.ownerCt.ownerCt.items.first().getForm();
					if(form.isValid()){
						Ext.Ajax.request({
							url:app.contextPath + '/base/syuser!doNotNeedSecurity_updateCurrentPwd.action',
							params:{'data.pwd':form.findField('data.pwd').getValue()},
							success:function(response,option)
							{
								var res = Ext.JSON.decode(response.responseText);
								if(res.success){
									button.ownerCt.ownerCt.hide();
									Ext.Msg.show({
										title : '提示',
										msg : '密码修改成功',
										buttons : Ext.Msg.OK,
										icon : Ext.Msg.INFO
									});
								}
							}
						});
					}
				}
			}
		})
	},
	views:['NorthView','UpdatePwdWindow','LockWindow','UserInfoWindow'],
	stores:[],
	models:[]
});