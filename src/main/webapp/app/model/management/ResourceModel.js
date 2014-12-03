Ext.define('somnus.model.management.ResourceModel', {
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'id'},
	         {name: 'name'},
	         {name: 'iconCls'},
	         {name: 'url',},
	         {name: 'createdatetime'},
	         {name: 'updatedatetime',},
	         {name: 'pid'},
	         {name: 'pname'},
	         {name: 'typeId'},
	         {name: 'typeName'},
	         {name: 'description'},
	         {name: 'seq'},
	         {name: 'target'}
	],
});