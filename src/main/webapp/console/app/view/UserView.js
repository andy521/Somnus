Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('App',app.basePath+'/console/app');
Ext.require([
    'App.apply.BtnSearch', 
    'App.apply.EmptySearch'
]);
Ext.define('App.view.UserView',{
	extend:'Ext.grid.Panel',
	alias:'widget.userview',
	store:'UserStore',
	columns:[Ext.create("Ext.grid.RowNumberer",{}),{
		text : '登录名',
		dataIndex : 'loginname',
		width : 200
	},{
		text : '姓名',
		dataIndex : 'name',
		width : 200
	},{
		text : '创建时间',
		dataIndex : 'createdatetime',
		width : 150,
		sortable : true
	},{
		text : '修改时间',
		dataIndex : 'updatedatetime',
		width : 150,
		sortable : true
	},{
		text:'性别',
		dataIndex:'sex',
		renderer:function(value){
			switch (value){
				case '0':
					return Ext.formatString("<span style='color:green;font-weight:bold;'>女</span><img src='{0}/style/images/ext_icons/user/user_female.png' />",app.contextPath);
				case '1':
					return Ext.formatString("<span style='color:red;font-weight:bold;'>男</span><img src='{0}/style/images/ext_icons/user/user_suit.png' />",app.contextPath);
			}
		}
	},{
		text : '年龄',
		dataIndex : 'age',
		width : 80,
		hidden : true
	},{
		text : '照片',
		dataIndex : 'photo',
		width : 80
	},{
		text : '操作',
		xtype : 'actioncolumn',
		dataIndex : 'action',
		width : 60,
		items:[{
			iconCls:'ext-icon-note',
			tooltip:'查看'
		},{
			iconCls:'ext-icon-note_edit',
			tooltip:'编辑'
		},{
			iconCls:'ext-icon-key',
			tooltip:'授权'
		},{
			iconCls:'ext-icon-note_delete',
			tooltip:'删除'
		}]
	}],
	dockedItems:[{
		xtype : 'toolbar',
		dock : 'top',
		items:[{
			xtype:'textfield',
			name:'QUERY_t#loginname_S_LK',
			fieldLabel:'登录名',
			labelWidth : 50,
			width: 200
		},{
			xtype:'textfield',
			name:'QUERY_t#name_S_LK',
			fieldLabel:'姓名',
			labelWidth : 50,
			width: 200
		},{
			xtype : 'combo',
			fieldLabel : '性别',
			labelWidth : 50,
			width: 150,
			name:'QUERY_t#sex_S_EQ',
			store : {
				fields:[{name:'text',type:'string'},{name:'value',type:'string'}],
				data:[{text:'男',value:'1'},{text:'女',value:'0'}]
			},
			valueField : 'value',
			displayField : 'text',
			queryMode : 'local',
			emptyText:'请选择'
		},{
			xtype:'datefield',
			name:'QUERY_t#createdatetime_D_GE',
			format:'Y-m-d H:i:s',
			fieldLabel:'创建时间',
			labelWidth : 60,
			width: 220
		},'—',{
			xtype:'datefield',
			format:'Y-m-d H:i:s',
			name:'QUERY_t#createdatetime_D_LE',
			width: 160
		},{
			xtype:'btnsearch',
			store: 'UserStore',
			paramName:['QUERY_t#loginname_S_LK','QUERY_t#name_S_LK','QUERY_t#sex_S_EQ','QUERY_t#createdatetime_D_GE','QUERY_t#createdatetime_D_LE'],
			text:'过滤'
		}]
	},{
		xtype:'pagingtoolbar',
		store: 'UserStore',
		dock :'bottom',
		displayInfo: true
}],
	viewConfig:{
		forceFit:true,
		loadMask:true,
		stripeRows:true
	}
})