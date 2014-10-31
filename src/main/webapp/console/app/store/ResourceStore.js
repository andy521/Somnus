Ext.define("App.store.ResourceStore",{
	extend:'Ext.data.TreeStore',
	model:'App.model.ResourceModel',
	proxy:{
		type:'ajax',
		url:app.contextPath + '/base/syresource!treeGrid.action',
		reader:"json",
		extractResponseData: function(response) {
            var json = Ext.loadFilter(Ext.JSON.decode(response.responseText),{parentField : 'pid'});
            Ext.each(json,function(record){
          	  	if(Ext.isEmpty(record.children)){
          	  		record.expanded = false;
          	  		record.leaf = true;
          	  	}else{
          	  		record.expanded = true;
          	  		Ext.each(record.children,function(rec){
          	  			if(Ext.isEmpty(rec.children)){
          	  				rec.expanded = false;
          	  				rec.leaf = true;
          	  			}else{
          	  				rec.expanded = true;
          	  				rec.leaf = false;
          	  			}
          	  		});
          	  	}
            });
            response.responseText = Ext.JSON.encode(json);
            return response  
        }
	},
	autoLoad: true
});