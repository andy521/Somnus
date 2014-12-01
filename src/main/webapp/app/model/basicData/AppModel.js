Ext.define('somnus.model.basicData.AppModel', {
    extend: 'Ext.data.Model',
    fields: [
        'status',
        'notifyAdd',
        'modifyTime',
        'modifyBy',
        'createTime',
        'createBy',
        'appName',
        'appId',
        'appCode',
        'remark'
    ]
});