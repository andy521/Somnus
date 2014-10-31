/**
 * 扩展tree和combotree，使其支持平滑数据格式
 * 
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 * 
 */
Ext.loadFilter= function(data, opt) {
	var idField, textField, parentField;
	if (opt.parentField) {
		idField = opt.idField || 'id';
		textField = opt.textField || 'text';
		parentField = opt.parentField || 'pid';
		var i, l, treeData = [], tmpMap = [];
		for (i = 0, l = data.length; i < l; i++) {
			tmpMap[data[i][idField]] = data[i];
		}
		for (i = 0, l = data.length; i < l; i++) {
			if (tmpMap[data[i][parentField]] && data[i][idField] != data[i][parentField]) {
				if (!tmpMap[data[i][parentField]]['children'])
					tmpMap[data[i][parentField]]['children'] = [];
				data[i]['text'] = data[i][textField];
				data[i]['leaf'] = true;//判断为叶子节点
				tmpMap[data[i][parentField]]['children'].push(data[i]);
			} else {
				data[i]['text'] = data[i][textField];
				treeData.push(data[i]);
			}
		}
		return treeData;
	}
	return data;
}

Ext.apply(Ext.form.field.VTypes, {
	eqPwd :function(val, field) 
	 	{
    	return val == field.ownerCt.getForm().findField('data.pwd').getValue();
	},
	eqPwdText: '两次输入密码不一致'
});

/**
 * 增加formatString功能
 * 
 * @author 孙宇
 * 
 * @example sy.formatString('字符串{0}字符串{1}字符串','第一个变量','第二个变量');
 * 
 * @returns 格式化后的字符串
 */
Ext.formatString = function(str) {
	for (var i = 0; i < arguments.length - 1; i++) {
		str = str.replace("{" + i + "}", arguments[i + 1]);
	}
	return str;
};
Ext.dateFormat = function(value){
	if(null != value){         
		return Ext.Date.format(new Date(value),'Y-m-d H:i:s');     
	}else{         
		return null;     
	} 
} 