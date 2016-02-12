Ext.ns("Ext.test.search");

Ext.onReady(function() {
    Ext.QuickTips.init();
        var appMessage = null;

        var editForm = new Ext.test.search.EditForm();
        
        var panel = new Ext.Panel({
        	title:'Edit Employee Details :',
        	width:800,
        	height:700,
        	items:[editForm]
        	
        });
        panel.render('editDiv');
});