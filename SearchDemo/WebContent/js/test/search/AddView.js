Ext.ns("Ext.test.search");

Ext.onReady(function() {
    Ext.QuickTips.init();
        var appMessage = null;

        var addForm = new Ext.test.search.MyFirstForm();
        
        var panel = new Ext.Panel({
        	//title:'Add Employee Details :',
        	width:800,
        	//height:700,
        	items:[addForm]
        	
        });
        panel.render('addDiv');
});