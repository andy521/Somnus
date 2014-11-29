Ext.define('somnus.view.monitor.DruidView',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.druidView',
	frame: true,
	initComponent: function () {
		Ext.apply(this, {
			layout:'fit',
			title : '数据源监控',
			closable:true,
			iconCls:'ext-icon-monitor_link',
			bodyStyle : 'padding:0px',
			html:Ext.formatString('<iframe src="{0}/druid" allowTransparency="true" style="border: 0; width: 100%; height: 99%;" frameBorder="0"></iframe>' , app.contextPath)
		});
		this.callParent(arguments);
	}
});