// extjs程序入口
extRoot = app.basePath+"/jslib/ext-4.2.1/";
// 配置动态加载路径
Ext.Loader.setConfig({
	enabled: true,
	paths: {
		'Ext.ux': extRoot + '/ux',
		'somnus':app.basePath+'/app'
	}
});

/*Ext.require('Ext.ux.TabCloseMenu');*/
Ext.require('somnus.common.base.BaseCombo');
Ext.require('somnus.common.base.BaseComboModel');
Ext.require('somnus.common.util.DateRange');

Ext.require('somnus.common.apply.BtnSearch');
Ext.require('somnus.common.apply.ComboBoxTree');
Ext.require('somnus.common.apply.EmptySearch');
Ext.require('somnus.common.apply.ImageBrowse');
Ext.require('somnus.common.apply.SearchField');

Ext.override(Ext.form.field.Date, {
	editable: false
});

Ext.onReady(function () {
	Ext.application({
		name: 'somnus',
		appFolder: 'app',
		autoCreateViewport: true,
		controllers: [],
		launch: function() {}
	});
});