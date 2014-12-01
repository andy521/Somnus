Ext.define('somnus.model.basicData.CmdModel', {
    extend: 'Ext.data.Model',
    fields: [
        'cmdId',
        'cmdCode',
        'cmdName',
        'arguments',
        'reguler',
        'appId',
        'appName',
        'status',
        'remark',
        'createTime',
        'createBy',
        'modifyTime',
        'modifyBy'
    ]
});