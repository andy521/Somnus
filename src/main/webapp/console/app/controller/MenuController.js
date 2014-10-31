Ext.define("App.controller.MenuController",{
	extend:'Ext.app.Controller',
	init:function(){
		this.control({
			'menuview':{
				itemclick:function(tree,record,item,index,e,options){
					var url  = record.get('url');
					if (!Ext.isEmpty(url)&&record.isLeaf()){
						var src = app.contextPath + url;
						if (!Ext.String.startsWith(url, '/')) {
							src =url;
						}
						if (record.get('target') && record.get('target')=='_blank') {
							window.open(src, record.get('target'));
						}else{
							var tabs = tree.ownerCt.ownerCt.ownerCt.child('#tabview');
							var tabPage = tabs.getComponent(record.get('id'));
							if(Ext.isEmpty(tabPage)){
								if(record.get('target')=='cmp'){
									var panel = Ext.create(record.get('url'),{
										id:record.get('id'),
										title : record.get('text'),
										closable : true,
										iconCls : record.get('iconCls'),
										border : false
									});
									tabPage = tabs.add(panel);
									tabs.setActiveTab(tabPage);
								}else{
									var panel = Ext.create('Ext.panel.Panel',{
										id:record.get('id'),
										title : record.get('text'),
										closable : true,
										iconCls : record.get('iconCls'),
										html : Ext.formatString('<iframe src="{0}" allowTransparency="true" style="border:0;width:100%;height:99%;" frameBorder="0"></iframe>', src),
										border : false
									});
									tabPage = tabs.add(panel);
									tabs.setActiveTab(tabPage);
								}
							}else{
								tabs.setActiveTab(tabPage);
							}
						}
					}
				}
			}
		})
	},
	views:['MenuView'],
	stores:['MenuStore'],
	models:['MenuModel']
});