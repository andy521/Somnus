Ext.define('somnus.model.management.ResourceModel', {
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'id', type: 'string'},
	         {name: 'name', type: 'string'},
	         {name: 'iconCls',  type: 'string'},
	         {name: 'url',  type: 'string'},
	         {name: 'createdatetime',  type: 'string'},
	         {name: 'updatedatetime',  type: 'string'},
	         {name: 'typeName',  type: 'string'},
	         {name: 'description',  type: 'string'},
	         {name: 'seq',  type: 'string'},
	         {name: 'target',  type: 'string'}
	],
	associations: [{
		type: 'hasOne', 
		model: 'somnus.model.management.ResourceTypeModel' ,
		associationKey:'syresourcetype',
		getterName:'getType'
	}]
});