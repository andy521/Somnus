Ext.define('somnus.common.util.DateRange', {
	extend: 'Ext.form.FieldContainer',
	alias: 'widget.daterange',
	width: 220,
	height: 24,
	style: 'padding-top: 1px;',
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	startDateName: 'startDate',
	endDateName: 'endDate',
	range: '-1d',
	defaultInterval: Date.DAY,
	initComponent: function () {
		var now = new Date(), endDate, beginDate, rangeValue, interval;
		beginDate = Ext.Date.getFirstDateOfMonth(now);
		endDate = now;
		this.startDateField = Ext.create('Ext.form.field.Date', {
			name: this.startDateName,
			flex: 1,
			format: 'Y-m-d',
			showToday: true,
			value: beginDate ? Ext.Date.format(beginDate, 'Y-m-d') : undefined
		});
		this.endDateField = Ext.create('Ext.form.field.Date', {
			name: this.endDateName,
			flex: 1,
			format: 'Y-m-d',
			showToday: true,
			value: endDate ? Ext.Date.format(endDate, 'Y-m-d') : undefined
		});
		this.items = [
	this.startDateField,
	{
		xtype: 'label',
		text: '-',
		style: 'padding: 2px;'
	} ,
	this.endDateField
	];
		this.callParent();
	},
	getStartDate: function () {
		return this.startDateField.getRawValue();
	},
	getEndDate: function () {
		return this.endDateField.getRawValue();
	}
});
