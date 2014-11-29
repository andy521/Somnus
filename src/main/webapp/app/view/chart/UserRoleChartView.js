Ext.define('somnus.view.chart.UserRoleChartView',{
	extend:'Ext.chart.Chart',
	alias:'widget.userRoleChartView',
	closable:true,
	iconCls:'ext-icon-chart_pie',
    animate: true,
    title:'用户角色分布',
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
});