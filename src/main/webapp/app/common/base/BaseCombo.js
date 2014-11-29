Ext.define('somnus.common.base.BaseCombo', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.basecombo',
	queryMode: 'local',
	displayField: 'label',
	valueField: 'value',
	editable: false,
	showAll: false,
	idProperty: 'value',
	loadingText: '正在加载数据，请稍侯……',
	entityName: '',
	url: '/json/getCombo.json',
	// triggerAction:'all',
	initComponent: function () {
		var me = this;
		this.store = Ext.create('Ext.data.Store', {
			// fields: ['value', 'label'],
			model: 'somnus.common.base.BaseComboModel',
			autoLoad: true,
			singleton: true,
			proxy: {
				type: 'ajax',
				extraParams: {
					entityName: this.entityName
				},
				url: app.contextPath + me.url,
				reader: {
					type: 'json',
					root: 'results'
				}
			}
		});
		this.callParent();
		this.store.on('load', function (store, records, successful, operation, options) {
			if (this.showAll) {
				var record = Ext.create('somnus.common.base.BaseComboModel', {value: '', label: '全部'});
				this.store.insert(0, [record]);
				this.setValue('');
			}
			if (!Ext.isEmpty(this.value)) {
				this.setValue(this.value);
				this.clearInvalid();
			}
		}, this);
	}
});
