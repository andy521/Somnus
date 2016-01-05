Ext.define('somnus.model.monitor.OnlineModel', {
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'id',type: 'string'},
	         {name: 'loginname',type: 'string'},
	         {name: 'ip', type: 'string'},
	         {name: 'attribution', type: 'string'},
	         {name: 'createdatetime',  type: 'string'},
	         {name: 'type',  type: 'string'}
	]
});