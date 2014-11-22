Ext.define("App.view.NorthView",{
	extend:'Ext.panel.Panel',
	alias:'widget.northview',
	border:false,
	bodyStyle:'background-color:#3992D4',
	items:[{
		xtype:'container',
		style:{
			position:'absolute',
			right:'30px',
			top:'5px',
			width:'150px'
		},
		html:'<font style="font-size:15px;float:right;">'+Ext.formatString('欢迎您，{0}',app.loginname)+'</font>'
	},{
		xtype:'container',
		style:{
			position:'absolute',
			left:'18px',
			top:'0px',
			width:'155px'
		},
		html:Ext.formatString('<img src="{0}/style/images/logo-screen-noglow.png"/>',app.contextPath)
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
					css:'ext-all-neptune.css'
	        	},{
	        		xtype:'menucheckitem',
	        		group:'theme',
	        		text: '经典蓝',
	        		css:'ext-all.css'
	        	},{
	        		xtype:'menucheckitem',
	        		group:'theme',
	        		text: '深夜黑',
	        		css:'ext-all-access.css'
	        	},{
	        		xtype:'menucheckitem',
	        		group:'theme',
	        		text: '玛雅灰',
	        		css:'ext-all-gray.css'
	        	}]
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
						iconCls:'ext-icon-user_edit'
					},{
						xtype:'menuitem',
						id:'showmine',
						text: '我的信息',
						iconCls:'ext-icon-user'
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
					iconCls:'ext-icon-lock'
	    		},{
	    			xtype:'menuitem',
	    			id:'existsys',
					text: '退出系统',
					iconCls:'ext-icon-door_out'
	    		}]
	    	}
		}]
	}]
});