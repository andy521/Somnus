Ext.define('somnus.model.management.ResourceModel', {
	extend: 'Ext.data.Model',
	mixins: ['Ext.data.NodeInterface'],
	fields: [
	         {name: 'id'},
	         {name: 'name'},
	         {name: 'text'},
	         {name: 'checked'},
	         {name: 'leaf'},
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