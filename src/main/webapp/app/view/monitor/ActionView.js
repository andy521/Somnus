Ext.define('somnus.view.monitor.ActionView',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.actionView',
	frame: true,
	initComponent: function () {
		Ext.apply(this, {
			layout:'fit',
			title : 'Action映射监控',
			closable:true,
			iconCls:'ext-icon-monitor_lightning',
			bodyStyle : 'padding:0px',
			html:Ext.String.format('<iframe src="{0}/config-browser/showConstants.action" allowTransparency="true" style="border: 0; width: 100%; height: 99%;" frameBorder="0"></iframe>' , app.contextPath)
		});
		this.callParent(arguments);
	}
});