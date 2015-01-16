Ext.define('somnus.view.demo.CxfView',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.cxfView',
	frame: true,
	initComponent: function () {
		Ext.apply(this, {
			layout:'fit',
			title : 'CXF',
			closable:true,
			bodyStyle : 'padding:0px',
			html:Ext.String.format('<iframe src="{0}/ws" allowTransparency="true" style="border: 0; width: 100%; height: 99%;" frameBorder="0"></iframe>' , app.contextPath)
		});
		this.callParent(arguments);
	}
});