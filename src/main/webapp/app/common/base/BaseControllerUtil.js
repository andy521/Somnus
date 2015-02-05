Ext.define("somnus.common.base.BaseControllerUtil", {
	/*
	 * 加载Form表单数据
	 * */
	doLoad: function() {
		var formpanel = this.formPanel;
		var form = this.formPanel.getForm();
		form.load({
			url: app.contextPath + '/base/'+ this.baseUrl+'!getById.action', 
			params:{id:this.pk}, 
			method: 'GET',
			waitMsg: '正在加载..',
			timeout: 60 * 1000,
			success: function (formbasic, action) {
				formbasic.getFields().each(function(field){
					var fieldName = field.getName();
					var arr = fieldName.split(".");
					if(arr.length == 3){
						if(!Ext.isEmpty(action.result.data[arr[1]]))
							formbasic.findField(fieldName).setValue(action.result.data[arr[1]][arr[2]]);
					}else if(arr.length == 2){
						formbasic.findField(fieldName).setValue(action.result.data[arr[1]]);
					}
				})
			},
			failure: function (formbasic, action) {
				var result = Ext.decode(action.response.responseText);
				if(!Ext.isEmpty(result.sessionstatus)&&result.sessionstatus=='timeOut'){
					formpanel.ownerCt.close();
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
			},
			scope: this
		});
	},
	/*
	 * 新增和修改from表单信息
	 * */
	doSave: function () {
		var me = this;
		var form = this.formPanel.getForm();
		if (!form.isValid()) {
			return;
		}
		form.submit({
			url:app.contextPath + '/base/'+this.baseUrl +'!'+this.action+".action",
			submitEmptyText: false,
			waitMsg: '正在提交...',
			success: function (form, action) {
				var results = Ext.decode(action.response.responseText);
				if (results.success) {
					Ext.Msg.show({
						title: '信息',
						msg: '操作成功！',
						buttons: Ext.Msg.OK,
						icon: Ext.Msg.INFO,
						fn: function () {
							me.fireEvent('success');
							me.close();
						}
					});
				}
			},
			failure: function (form, action) {
				var results = Ext.decode(action.response.responseText);
				Ext.Msg.show({
					title: '信息',
					msg: results.message||results.msg,
					buttons: Ext.Msg.OK,
					icon: Ext.Msg.ERROR,
					fn: function () {
						me.fireEvent('failure');
					}
				});
			}
		});
	},
	/*
	* 删除grid 选择信息
	* @parse {} 对应grid
	* @parse {
	* .Msg 1 是否 不显示弹出信息
	* }
	* */
	doDelete: function (grid, id) {
		var store = grid.getStore(); //得到数据集合
		Ext.MessageBox.confirm("提示", '确定要删除此记录吗', function (btn) {
			if (btn == 'yes') {
				Ext.Ajax.request({
					url: store.getProxy().api['destroy'],
					params: {
						id: id
					},
					timeout: 4000,
					success: function (response, opts) {
						store.load();
					}
				})
			}
		});
	},
	doDelete2: function (grid,tree, id) {
		var store = grid.getStore(); //得到数据集合
		var treestore = tree.getStore(); //得到数据集合
		Ext.MessageBox.confirm("提示", '确定要删除此记录吗', function (btn) {
			if (btn == 'yes') {
				Ext.Ajax.request({
					url: store.getProxy().api['destroy'],
					params: {
						id: id
					},
					timeout: 4000,
					success: function (response, opts) {
						store.load();
						treestore.load();
					}
				})
			}
		});
	},
	/*doDelete: function (grid, pkName) {
		var store = grid.getStore(); //得到数据集合
		var records = grid.getSelectionModel().getSelection();
		var pks = [];
		Ext.Array.each(records, function (record) {
			pks.push(record.get(pkName));
		});
		if (pks.length > 0) {
			Ext.MessageBox.confirm("提示", '确定要删除此记录吗', function (btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url: store.getProxy().api['destroy'],
						params: {
							pks: pks
						},
						timeout: 4000,
						success: function (response, opts) {
							store.load();
						}
					})
				}
			});
		} else {
			Ext.Msg.alert("提示", "请选择一条信息");
		}
	},*/
	/**
	* 树形删除操作
	* @param {} Tree 要操作的树
	* @param string pkv 唯一标识值
	* @param string pk 唯一标识pk
	*/
	doDeleteT: function (Tree, pkv, pk, callback) {
		if (!Tree || !pkv) return;
		var me = this, param = {}, url = Tree.getStore().getProxy().api['remove']; //得到数据集合
		param[pk] = pkv; //设置参数
		Ext.Ajax.request({
			url: url,
			params: param,
			success: function (response, opt) {
				var node = me.getNodeByPk(Tree, pkv, pk);
				var parentNode = node.parentNode;
				try {
					if (parentNode) {
						parentNode.removeChild(node);
						if (!parentNode.getChildAt(0)) {
							parentNode.data['leaf'] = true;
							parentNode.updateInfo({leaf: true});
						}
					}
				} catch (e) {
					console.log(e);
				}
				if (typeof(callback) == 'function') callback(response); //执行回调函数
				var ret = eval("(" + response.responseText + ")");
				Ext.Msg.alert("提示", ret.message);
			}
		});
	},
	/**
	* 树形维护插入/更新操作
	* @param {} tree
	* @param {
	* pk : 主键id
	* pid : 父级标识(pid)
	* param : 插入/更细数据
	* callback: 回调函数(插入成功后的id)
	* }
	*/
	doInsertT: function (tree, paramObj) {
		var me = this;
		if (!tree) {
			alert("参数传递不正确");
			return;
		}
		var pk = paramObj.pk || 'id', parseObj = paramObj.param; //取得对应主键
		var type = parseObj[pk] ? 'update' : 'insert'; //更新/插入数据
		Ext.Ajax.request({
			url: tree.getStore().getProxy().api[type],
			params: parseObj,
			submitEmptyText: false,
			waitMsg: '提交...',
			success: function (res, action) {
				var ret = eval('(' + res.responseText + ')');
				var ret_arr = ret.message.split('-');
				if ('update' == type) {
					var Node = me.getNodeByPk(tree, parseObj[pk], pk);
					var _Node = Node;
					_Node.data = Ext.apply(_Node.data, parseObj);
					Node.parentNode.replaceChild(_Node, Node); //更新节点
				} else if ('insert' == type) {
					var pid = paramObj.pid || 'pid' , pidVal = parseObj[pid];
					var parentNode = me.getNodeByPk(tree, pidVal, pk);
					var resObj = Ext.applyIf({
						id: ret_arr[1],
						text: parseObj["text"],
						leaf: true
					}, parseObj);
					if (resObj[pk] == '') resObj[pk] = ret_arr[1]; // 当主键为返回型时
					if (parentNode) { // 判断是否有父级节点
						try {
							parentNode.data['leaf'] = false;
							parentNode.updateInfo();
							//设置为parentNode 添加元素
							parentNode.appendChild(resObj);
							parentNode.expand();
						} catch (e) {
							console.dir(e);
						}
					} else { //无父节点 ,即为根节点
						var rootNode = tree.getStore().getRootNode();
						rootNode.appendChild(resObj);
					}
				}
				Ext.Msg.alert('提示', ret_arr[0]);
				if (typeof (paramObj.callback) == 'function') paramObj.callback(ret_arr[1]); //调用回调函数
			},
			failure: function (form, action) {
				var ret = eval('(' + action.response.responseText + ')');
				Ext.Msg.alert('提示', ret.message);
			}
		});
	},
	/**
	* 通过主键获取Node
	* @param {} treeObj
	* @param string pkv 主键值
	* @param string pk 主键标识
	*/
	getNodeByPk: function (tree, pkv, pk) {
		if ('id' == pk) { //默认pk
			var Node = tree.getStore().getNodeById(pkv);
		} else { //若不是id则循环查找节点
			for (i in tree.getStore().tree.nodeHash) {
				if (pkv == tree.getStore().tree.nodeHash[i].data[pk]) {
					Node = tree.getStore().tree.nodeHash[i];
					break;
				}
			}
		}
		return Node;
	},
	/**
	* TreePanel事件（全选、反选）
	* @param node
	* @param checked 
	* @param options pk 
	*/
	checkchange:function(node,checked,options){
		if(node.data.leaf == false){
			if(checked){
				node.expand();
				node.updateInfo(true,{checked:true});
				node.eachChild(function(n){
					n.data.checked = true;
					n.updateInfo(true,{checked:true});
				})
			}else{
				node.expand();
				node.eachChild(function(n){
					n.data.checked = false;
					n.updateInfo(true,{checked:false});
				})
			}
		}else{
			if(!checked){
				node.parentNode.data.checked = false;
				node.parentNode.updateInfo(true,{checked:false});
			}
		}
	}
});