Ext.define('App.model.ResourceModel', {
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'id', type: 'string'},
	         {name: 'name', type: 'string'},
	         {name: 'iconCls',  type: 'string'},
	         {name: 'url',  type: 'string'},
	         {name: 'createdatetime',  type: 'string'},
	         {name: 'updatedatetime',  type: 'string'},
	         {name: 'syresourcetype',  type: 'object'},
	         {name: 'description',  type: 'string'},
	         {name: 'seq',  type: 'string'},
	         {name: 'target',  type: 'string'}
	]
});