Ext.define('somnus.model.management.OrganizationModel', {
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'name', type: 'string'},
	         {name: 'iconCls',  type: 'string'},
	         {name: 'code',  type: 'string'},
	         {name: 'address',  type: 'string'},
	         {name: 'createdatetime',  type: 'string'},
	         {name: 'updatedatetime',  type: 'string'},
	         {name: 'seq',  type: 'string'}
	]
});