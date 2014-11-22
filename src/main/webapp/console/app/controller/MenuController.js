Ext.define("App.controller.MenuController",{
	extend:'Ext.app.Controller',
	alias:'widget.menucontroller',
	refs:[
	      {
	    	  ref: 'contenttab',
	    	  selector: 'contenttab'
	      }
	],
	init:function(){
		this.control({
			'panel > menuview':{
				afterrender:function(treepanel){
            		treepanel.on('itemclick',function(tree,record,item,index,e,options){
    					var url  = record.get('url'),
    						id  = record.get('id'),
    						title  = record.get('text'),
    						target  = record.get('target');
    					if (!Ext.isEmpty(url)&&record.isLeaf()){
    						var src = app.contextPath + url;
    						if (!Ext.String.startsWith(url, '/')) 
    							src =url;
    						if (target && target=='_blank') {//如果是'_blank 在新窗口打开一个页面
    							window.open(src, target);
    						}else{
    							var contenttab = this.getContenttab();
    					    	var component = contenttab.getComponent(id);
    							if(Ext.isEmpty(component)){//如果不存在这个页面就创建一个，否则激活
    								if(target=='cmp'){
    									contenttab.getEl().mask("组件初始化中,请稍候...");
    						    		if(Ext.ClassManager.getNameByAlias('widget.'+url)){
    							    		component = Ext.widget(url,{
    							    			title:title,
    							    			closable:true,
    							    			closeAction:'hide',
    							    			id:id
    							    		});
    							    		contenttab.add(component).show();
    						    		}else{
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
												html: '模块建设中,敬请期待!'
											}).show();
    						    		}
    								}else{
    									var panel = Ext.create('Ext.panel.Panel',{
    										id:id,
    										title : title,
    										closable : true,
    										iconCls : record.get('iconCls'),
    										html : Ext.formatString('<iframe src="{0}" allowTransparency="true" style="border:0;width:100%;height:99%;" frameBorder="0"></iframe>', src),
    										border : false
    									});
    									contenttab.add(panel).show();
    								}
    							}else{
    								contenttab.setActiveTab(component);
    							}
    							contenttab.getEl().unmask();
    						}
    					}
    				},this);
            	}
			}
		})
	},
	views:['MenuView','ContentTabView'],
	stores:['MenuStore'],
	models:['MenuModel']
});