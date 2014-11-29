Ext.define('somnus.model.management.UserModel', {
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'loginname',type: 'string'},
	         {name: 'name', type: 'string'},
	         {name: 'createdatetime',  type: 'string'},
	         {name: 'updatedatetime',  type: 'string'},
	         {name: 'sex',  type: 'string'},
	         {name: 'age',  type: 'string'},
	         {name: 'photo',  type: 'string'}
	]
});