Ext.define('somnus.model.management.ResourceModel', {
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'id'},
	         {name: 'name'},
	         {name: 'iconCls'},
	         {name: 'url',},
	         {name: 'createdatetime'},
	         {name: 'updatedatetime',},
	         {name: 'type'},
	         {name: 'description'},
	         {name: 'seq'},
	         {name: 'target'}
	],
});