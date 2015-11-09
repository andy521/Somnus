Ext.define("somnus.store.management.RoleResourceTreeStore",{
	extend: 'Ext.data.TreeStore',
	model:'somnus.model.management.ResourceModel',
	proxy:{
		type:'ajax',
		url:app.contextPath + '/base/resource!doNotNeedSecurity_getResourcesTree.action',
		reader:"json",
		extractResponseData: function(response) {
            var json = Ext.loadFilter(Ext.JSON.decode(response.responseText),
            		{parentField : 'pid',textField:'name'});
            Ext.each(json,function(record){
            	record.checked = false;
            	if(Ext.isEmpty(record.children)){
          	  		record.expanded = false;
          	  		record.leaf = true;
          	  	}else{
          	  		record.expanded = true;
          	  		record.leaf = false;
          	  		Ext.each(record.children,function(rec){
          	  			rec.checked = false;
          	  			if(Ext.isEmpty(rec.children)){
          	  				rec.expanded = false;
          	  				rec.leaf = true;
          	  			}else{
          	  				rec.expanded = true;
          	  				rec.leaf = false;
          	  			}
          	  			Ext.each(rec.children,function(r){
          	  				r.checked = false;
          	  			});
          	  		});
          	  	}
            });
            response.responseText = Ext.JSON.encode(json);
            return response  
        }
	},
	autoLoad: true
});