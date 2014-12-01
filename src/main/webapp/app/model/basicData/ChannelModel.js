Ext.define('somnus.model.basicData.ChannelModel', {
    extend: 'Ext.data.Model',
    fields: [
        'status',
        'modifytime',
        'modifyby',
        'createtime',
        'createby',
        'channelname',
        'channelid',
		'alertbalance',
        'beanId',
        'remark'
    ]
});