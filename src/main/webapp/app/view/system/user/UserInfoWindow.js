var xtpl = new Ext.XTemplate(  
    '<tpl for="."><fieldset><legend>用户信息</legend>',  
        '<table width="100%" align="center" cellpadding="0" cellspacing="0" style="font-size:12px;border-collapse:collapse;" >',  
               '<tr height="30" align="center" style="border:1px solid #000000;">',    
                   '<td style="border:1px solid #8AABBC;background-color:#F8F8F8">用户id</td>',  
                   '<td style="border:1px solid #8AABBC;">&nbsp;{id}</td>',  
                   '<td style="border:1px solid #8AABBC;background-color:#F8F8F8">使用IP</td>',  
                   '<td style="border:1px solid #8AABBC;">&nbsp;{ip}</td>',  
               '</tr>',  
               '<tr height="30" align="center" style="border:1px solid #000000;">',    
                   '<td style="border:1px solid #8AABBC;background-color:#F8F8F8">登陆名</td>',  
                   '<td style="border:1px solid #8AABBC;">&nbsp;{loginname}</td>',  
                   '<td style="border:1px solid #8AABBC;background-color:#F8F8F8">姓名</td>',  
                   '<td style="border:1px solid #8AABBC;">&nbsp;{name}</td>',  
               '</tr>',  
               '<tr height="30" align="center">',    
                   '<td style="border:1px solid #8AABBC;background-color:#F8F8F8">性别</td>',  
                   '<td style="border:1px solid #8AABBC;">&nbsp;{sex}</td>',  
                   '<td style="border:1px solid #8AABBC;background-color:#F8F8F8">年龄</td>',  
                   '<td style="border:1px solid #8AABBC;">&nbsp;{age}</td>',  
               '</tr>',  
               '<tr height="30" align="center">',    
                   '<td style="border:1px solid #8AABBC;background-color:#F8F8F8">创建时间</td>',  
                   '<td style="border:1px solid #8AABBC;">&nbsp;{createdatetime}</td>',  
                   '<td style="border:1px solid #8AABBC;background-color:#F8F8F8">最后修改时间</td>',  
                   '<td style="border:1px solid #8AABBC;">&nbsp;{updatedatetime}</td>',  
               '</tr>',  
        '</table></fieldset>',  
    '</tpl>'  
); 
var xtpls = new Ext.XTemplate(  
	    '<tpl for="."><fieldset><legend>权限信息</legend>',  
	        '<table width="100%" align="center" cellpadding="0" cellspacing="0" style="font-size:12px;border-collapse:collapse;" >',  
	        	'<tr height="30" align="center" style="border:1px solid #8AABBC;">',    
	        		'<th style="border:1px solid #8AABBC;font-size:12px;width:200px;background-color:#F8F8F8;">角色</td>',
	        		'<th style="border:1px solid #8AABBC;font-size:12px;width:200px;background-color:#F8F8F8;">机构</td>', 
	        		'<th style="border:1px solid #8AABBC;font-size:12px;width:280px;background-color:#F8F8F8;">权限</td>', 
	        	'</tr>',  
	        	'<tr height="420" align="center" style="border:1px solid #8AABBC;">',    
	        		'<td valign="top" style="border:1px solid #8AABBC;">&nbsp;{role}</td>',  
	        		'<td valign="top" style="border:1px solid #8AABBC;">&nbsp;{organization}</td>',  
	        		'<td valign="top" style="border:1px solid #8AABBC;"><ul id="resources"></ul></td>',  
	        	'</tr>',  
	        '</table></fieldset>',  
	    '</tpl>'  
	); 
Ext.define('somnus.view.system.user.UserInfoWindow',{
	extend:'Ext.window.Window',
	alias:'widget.userinfowindow',
	title: '我的信息',
	closeAction : 'hide',
	iconCls : 'ext-icon-user',
	width: 680,
	height: 680,
	frame:true,
	modal : true,//遮罩
	bodyStyle: 'background:#FFF;',
	layout : 'absolute',
	items:[{
		xtype:'dataview',
		width: 665,
		x:1,
		y:1,
		store : {
			fields:[{name:'id'},{name:'ip'},{name:'loginname'},{name:'name'},{name:'age'},{name:'sex'},{name:'createdatetime'},{name:'updatedatetime'}],
			data:[{id:app.id,ip:app.ip,loginname:app.loginname,name:app.name,sex:app.sex,age:app.age,createdatetime:app.createdatetime,updatedatetime:app.updatedatetime}]
		},
		tpl:xtpl,
		itemSelector: 'div.patient-source',
        overItemCls: 'patient-over',
        selectedItemClass: 'patient-selected',
        singleSelect: true,
        emptyText: ''
	},{
		xtype:'dataview',
		x:0,
		y:150,
		store : {
			fields:[{name:'role'},{name:'organization'}],
			data:[{role:app.role,organization:app.organization}]
		},
		tpl:xtpls,
		itemSelector: 'div.patient-source',
        overItemCls: 'patient-over',
        selectedItemClass: 'patient-selected',
        singleSelect: true,
        emptyText: ''
	},
	Ext.create('Ext.tree.Panel', {
		border:false,
		x:395,
		y:204,
		width:260,
		height:400,
		store: Ext.create('Ext.data.TreeStore', {
			fields: ['url', 'text', 'target'],
			proxy:{
				type:'ajax',
				url:app.contextPath + '/base/resource!doNotNeedSecurity_getMainMenu.action',
				reader:"json",
				extractResponseData: function(response) {
		              var json = Ext.loadFilter(Ext.JSON.decode(response.responseText),{parentField : 'pid'});
		              Ext.each(json,function(record){
		            	  if(Ext.isEmpty(record.children)){
		            		  record.expanded = false;
		            		  record.leaf = true;
		            	  }else{
		            		  record.expanded = true;
		            	  }
		              });
		              response.responseText = Ext.JSON.encode(json);
		              return response  
		          }
			},
			autoLoad: true
		}),
		rootVisible: false
	})]
});