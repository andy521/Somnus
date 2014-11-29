Ext.define('somnus.view.monitor.MonitoringView',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.monitoringView',
	frame: true,
	initComponent: function () {
		Ext.apply(this, {
			layout:'fit',
			title : '项目监控',
			closable:true,
			iconCls:'ext-icon-monitor_error',
			bodyStyle : 'padding:0px',
			html:Ext.formatString('<iframe src="{0}/monitoring" allowTransparency="true" style="border: 0; width: 100%; height: 99%;" frameBorder="0"></iframe>' , app.contextPath)
		});
		this.callParent(arguments);
	}
});