Ext.define('somnus.view.chart.UserRoleChartView',{
	extend:'Ext.panel.Panel',
	alias:'widget.userRoleChartView',
	closable:true,
	iconCls:'ext-icon-chart_pie',
	title:'用户角色分布',
    items:[{
    	xtype:'chart',
    	height:600,
    	width:800,
    	animate: true,
	    store: 'chart.UserRoleChartStore',
	    shadow: true,
	    legend: {
	        position: 'right'
	    },
	    insetPadding: 60,
	    theme: 'Base:gradients',
	    series: [{
	        type: 'pie',
	        field: 'y',
	        showInLegend: true,
	        donut: false,
	        tips: {
	          trackMouse: true,
	          width: 140,
	          height: 28,
	          renderer: function(storeItem, item) {
	            this.setTitle(storeItem.get('name') + ': ' + storeItem.get('y'));
	          }
	        },
	        highlight: {
	          segment: {
	            margin: 20
	          }
	        },
	        label: {
	            field: 'name',
	            display: 'rotate',
	            contrast: true,
	            font: '18px Arial'
	        }
	    }]
    }]
});