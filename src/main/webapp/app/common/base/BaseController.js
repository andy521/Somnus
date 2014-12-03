Ext.define('somnus.common.base.BaseController', {
	extend: 'Ext.app.Controller',
	getViewInstance: function () {
		var me = this;
		if(!this.viewInstance) {
			if(this.views && this.views.length) {
				var view = this.getView(this.views[0]);
				this.viewInstance = view.create();
				this.viewInstance.close = function () {
					console.log(view.prototype);
					view.prototype.close.apply(this, arguments);
					me.viewInstance = null;
				};
			}
		}
		return this.viewInstance;
	}
});
