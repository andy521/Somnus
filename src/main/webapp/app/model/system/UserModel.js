Ext.define('somnus.model.system.UserModel', {
    extend: 'Ext.data.Model',
    fields: [
        'userId',
        'userName',
        'loginName',
        'loginPwd',
        'remark',
        'modifyTime',
        'modifyBy',
        'createTime',
        'createBy'
    ]
});