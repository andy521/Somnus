Ext.define('somnus.common.base.BaseFormNoSave', {
	extend: 'Ext.window.Window',
	mixins: ['somnus.common.base.BaseControllerUtil'],
	width: 480,
	resizable: false,
	modal: true,
	layout: 'fit',
	plain: true,
	action: 'create',
	initComponent: function () {
		this.buttons = this.buttons || [];
		this.callParent();
		if (!Ext.isEmpty(this.pk)) {
			this.action = 'update';
			this.on('show', function (){
				this.doLoad();
			});
		}
	}
});
