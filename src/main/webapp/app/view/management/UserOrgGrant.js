Ext.define('somnus.view.management.UserOrgGrant', {
    extend: 'Ext.window.Window',
    alias: 'widget.userOrgGrant',
    title: '修改机构',
    modal: true,
    initComponent: function () {
        this.treePanel = Ext.create('Ext.tree.Panel', {
        	width:500,
        	height:500,
        	/*displayField:'name',*/
        	store: 'management.OrgUserTreeStore',
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
