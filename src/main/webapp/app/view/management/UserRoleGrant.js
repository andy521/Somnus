Ext.define('somnus.view.management.UserRoleGrant', {
    extend: 'Ext.window.Window',
    alias: 'widget.userRoleGrant',
    title: '所属角色',
    modal: true,
    initComponent: function () {
        this.treePanel = Ext.create('Ext.tree.Panel', {
        	width:500,
        	height:500,
        	/*displayField:'name',*/
        	store: 'management.UserRoleTreeStore',
			rootVisible: false
        });
        this.grantBtn = Ext.create('Ext.button.Button', {
        	text: '修改',
        	action:'grant'
        });

        this.items = [this.treePanel];
        this.buttons = [this.grantBtn];
        this.callParent();
    }
});
