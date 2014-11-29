Ext.define('somnus.model.management.RoleModel', {
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'name', type: 'string'},
	         {name: 'createdatetime',  type: 'string'},
	         {name: 'updatedatetime',  type: 'string'},
	         {name: 'description',  type: 'string'},
	         {name: 'seq',  type: 'string'}
	]
});