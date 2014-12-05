Ext.define('somnus.common.base.BaseForm', {
    extend: 'Ext.window.Window',
    mixins: ['somnus.common.base.BaseControllerUtil'],
    width: 480,
    resizable: false,
    modal: true,
    layout: 'fit',
    plain: true,
    buttonSaveText: '保存',
    buttonCloseText: '关闭',
    action: 'save',
    isQuery:true,//是否是详细查询页面，默认true
    initComponent: function () {
        this.buttons = this.buttons || [];
        if(this.isQuery){
        	this.buttons.push({
            	text: this.buttonCloseText,
            	handler: this.close,
            	scope: this
            });
        }else{
        	this.buttons.push({
            	text: this.buttonSaveText,
            	handler: this.doSave,
            	scope: this
            },{
            	text: this.buttonCloseText,
            	handler: this.close,
            	scope: this
            });
        }
        this.callParent();
        if(this.isQuery){
        	if (!Ext.isEmpty(this.pk)) {
                this.on('show', function () {
                    this.doLoad();
                });
            }
        }else{
        	if (!Ext.isEmpty(this.pk)) {
                this.action = 'update';
                this.title = '编辑' + this.title;
                this.on('show', function () {
                    this.doLoad();
                });
            } else {
                this.title = '添加' + this.title;
            }
        }
    }
});

