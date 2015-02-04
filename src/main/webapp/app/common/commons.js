Ext.util.Observable.observeClass(Ext.data.Connection);
Ext.data.Connection.on('requestcomplete', function (conn, response) {
	if (response && response.getResponseHeader){
		if (response.getResponseHeader('sessionstatus') == 'timeOut') {
			Ext.Msg.show({
				title: '信息',
				msg: '对不起，当前登录已过期，请重新登录！',
				buttons: Ext.Msg.OK,
				icon: Ext.Msg.INFO,
				fn: function () {
					window.location.href = app.contextPath;
				}
			});
		}
	}
});
/**
 * 扩展tree和combotree，使其支持平滑数据格式
 */
Ext.loadFilter= function(data, opt) {
	var idField, textField, parentField;
	Ext.each(data,function(record){
		if(!Ext.isEmpty(record.attributes)){
			delete record.attributes;
		}
		if(!Ext.isEmpty(record.syresource)){
			delete record.syresource;
		}
		if(!Ext.isEmpty(record.syresourcetype)){
			delete record.syresourcetype;
		}
		if(!Ext.isEmpty(record.syorganization)){
			delete record.syorganization;
		}
	});
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
/**
 * 增加formatString功能
 * 
 * @author Somnus
 * 
 * @example Ext.formatString('字符串{0}字符串{1}字符串','第一个变量','第二个变量');
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
//一些验证
Ext.apply(Ext.form.field.VTypes, {
	daterange: function(val, field) {
        var date = field.parseDate(val);
        if (!date) {
            return false;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
        	var start = field.ownerCt.down('#' + field.startDateField);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        }
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
        	var end = field.ownerCt.down('#' + field.endDateField);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        return true;
    },
    daterangeText: 'Start date must be less than end date',
	unique: function (value, field) {
		var flag;
		var params = {};
		Ext.apply(params, {
			entity: field.vtypeEntity,
			name: field.name,
			value: value
		});
		this.uniqueText = Ext.String.format(this._uniqueText, value);
		console.log(field.up('form'));
		console.log(field.up('form').getForm());
		console.log(field.up('form').getForm().isDirty());
		console.log(field);
		console.log(value+'||'+field.originalValue);
		if (value === field.originalValue) {
			field.clearInvalid();
			return true;
		}
		Ext.Ajax.request({
			url: app.contextPath + '/base!checkIsUnique.action',
			params: params,
			async: false,
			success: function (response) {
				var result = Ext.decode(response.responseText);
				flag = result['unique'];
			}
		})
		return flag;
	},
	_uniqueText: '【{0}】已经被使用',
	password: function (val, field) {
		if (field.initialPassField) {
            var pwd = field.up('form').down('#' + field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
	},
	passwordText: '确认密码不同！',
	chinese: function (val, field) {
		var reg = /^[\u4e00-\u9fa5]+$/i;
		if (!reg.test(val)) {
			return false;
		}
		return true;
	},
	chineseText: '请输入中文',
	age: function (val, field) {
		try {
			if (parseInt(val) >= 18 && parseInt(val) <= 100)
				return true;
			return false;
		}
		catch (err) {
			return false;
		}
	},
	ageText: '年龄输入有误',
	alphanum: function (val, field) {
		try {
			if (!/\W/.test(val))
				return true;
			return false;
		}
		catch (e) {
			return false;
		}
	},
	alphanumText: '请输入英文字母或是数字,其它字符是不允许的.',
	url: function (val, field) {
		try {
			if (/^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i.test(val))
				return true;
			return false;
		}
		catch (e) {
			return false;
		}
	},
	urlText: '请输入有效的URL地址.',
	max: function (val, field) {
		try {
			if (parseFloat(val) <= parseFloat(field.max))
				return true;
			return false;
		}
		catch (e) {
			return false;
		}
	},
	maxText: '超过最大值',
	min: function (val, field) {
		try {
			if (parseFloat(val) >= parseFloat(field.min))
				return true;
			return false;
		}
		catch (e) {
			return false;
		}
	},
	minText: '小于最小值',
	datecn: function (val, field) {
		try {
			var regex = /^(\d{4})-(\d{2})-(\d{2})$/;
			if (!regex.test(val)) return false;
			var d = new Date(val.replace(regex, '$1/$2/$3'));
			return (parseInt(RegExp.$2, 10) == (1 + d.getMonth())) && (parseInt(RegExp.$3, 10) == d.getDate()) && (parseInt(RegExp.$1, 10) == d.getFullYear());
		}
		catch (e) {
			return false;
		}
	},
	datecnText: '请使用这样的日期格式: yyyy-mm-dd. 例如:2008-06-20.',
	integer: function (val, field) {
		try {
			if (/^[-+]?[\d]+$/.test(val))
				return true;
			return false;
		}
		catch (e) {
			return false;
		}
	},
	integerText: '请输入正确的整数',
	minlength: function (val, field) {
		try {
			if (val.length >= parseInt(field.minlen))
				return true;
			return false
		}
		catch (e) {
			return false;
		}
	},
	minlengthText: '长度过小',
	maxlength: function (val, field) {
		try {
			if (val.length <= parseInt(field.maxlen))
				return true;
			return false;
		}
		catch (e) {
			return false;
		}
	},
	maxlengthText: '长度过大',
	ip: function (val, field) {
		try {
			if ((/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(val)))
				return true;
			return false;
		}
		catch (e) {
			return false;
		}
	},
	ipText: '请输入正确的IP地址',
	phone: function (val, field) {
		try {
			if (/^((0[1-9]{3})?(0[12][0-9])?[-])?\d{6,8}$/.test(val))
				return true;
			return false;
		}
		catch (e) {
			return false;
		}
	},
	phoneText: '请输入正确的号码,如:021-88888888',
	mobilephone: function (val, field) {
		try {
			if (/(^0?[1][0-9][0-9]{9}$)/.test(val))
				return true;
			return false;
		}
		catch (e) {
			return false;
		}
	},
	mobilephoneText: '请输入正确的手机号码',
	alpha: function (val, field) {
		try {
			if (/^[a-zA-Z]+$/.test(val))
				return true;
			return false;
		}
		catch (e) {
			return false;
		}
	},
	alphaText: '请输入英文字母',
	alphaAndUnique: function (value, field) {
		if (!this.unique(value, field)) {
			this.alphaAndUniqueText = this.uniqueText;
		}
		if (!this.alpha(value, field)) {
			this.alphaAndUniqueText = this.alphaText;
		}
		return this.unique(value, field) && this.alpha(value, field);
	},
	mobilephoneAndUnique: function (value, field) {
		if (!this.unique(value, field)) {
			this.mobilephoneAndUniqueText = this.uniqueText;
		}
		if (!this.mobilephone(value, field)) {
			this.mobilephoneAndUniqueText = this.mobilephoneText;
		}
		return this.unique(value, field) && this.mobilephone(value, field);
	}
});
function fixDate(time) {
		if (!Ext.isIE) {
			return new Date(time);
		}
		var arr = time.split(time.match(/\D+/g)[0]);
		return new Date(arr[0], arr[1] - 1, arr[2]);
}
