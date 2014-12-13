Ext.define('somnus.view.management.RoleGrant', {
    extend: 'Ext.window.Window',
    alias: 'widget.roleGrant',
    title: '角色授权',
    modal: true,
    initComponent: function () {
        this.treePanel = Ext.create('Ext.tree.Panel', {
        	width:500,
        	height:500,
        	displayField:'name',
        	store: 'management.RoleGrantTreeStore',
			rootVisible: false
        });
        this.grantBtn = Ext.create('Ext.button.Button', {
        	text: '授权',
        	action:'grant'
        });

        this.items = [this.treePanel];
        this.buttons = [this.grantBtn];
        this.callParent();
    }
});
