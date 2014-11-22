Ext.define('App.view.ContentTabView' ,{
    extend: 'Ext.tab.Panel',
    alias : 'widget.contenttab',
    title : '',
    activeTab:0,
    autoDestroy:false,
    items:[{
		xtype:'panel',
		layout:'fit',
		title : '欢迎使用',
		iconCls:'ext-icon-heart',
		bodyStyle : 'padding:0px',
		html:Ext.formatString('<iframe src="{0}/welcome.jsp" allowTransparency="true" style="border: 0; width: 100%; height: 99%;" frameBorder="0"></iframe>' , app.contextPath)
	}]
});