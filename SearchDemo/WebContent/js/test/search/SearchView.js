Ext.ns("Ext.test.search");

Ext.onReady(function() {
    Ext.QuickTips.init();
        var appMessage = null;

        var form = new Ext.test.search.SearchForm();
        //var formTwo = new Ext.test.search.SearchFormTwo();
        var store = new Ext.test.search.SearchStore("getSearchData");
        var grid = new Ext.test.search.SearchResultGrid(store);
       // var myForm = new Ext.test.search.MyFirstForm();
        
        Ext.getCmp('roleListGridId').getStore().load();
        
        
        var panel = new Ext.Panel({
        	title:'Search Application :',
        	width:800,
        	height:700,
        	//items:[form,grid, myForm]
            items:[form,grid]
        	
        });
        panel.render('searchFormDiv');
});