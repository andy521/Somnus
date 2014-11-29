Ext.define('somnus.model.statistical.ChlStatModel', {
	extend: 'Ext.data.Model',
	fields: ['statDate','channelId','channelName','vldRecvCount','invldRecvCount','recvCount',
		'invldRecvPer','sendSuccCount','sendFailCount','sendCount','sumCount','sendFailPer']
});
