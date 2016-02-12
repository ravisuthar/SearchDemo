
Ext.onReady(function() {

        Ext.QuickTips.init();

        var store = new Ext.data.JsonStore({
           // url: 'getName',
            autoLoad: false,
        reader: new Ext.data.JsonReader
        	({
     				    successProperty: 'success',
     				    root: 'EmpData',
     				    fields: ['fName', 'lName']
        	})	
        });
        store.load();
		 var simple= new Ext.grid.GridPanel
		  ({
	            store: store,
	            name:'grdEmp',
	            id:'grdEmp',
	            
	            columns: [
	                {
	                    id       :'fName',
	                    header   : 'First Name', 
	                   autoWidth: true, 
	                    sortable : true, 
	                    dataIndex: 'fName'
	                },
	                {
	                    header   : 'Last Name', 
	                    autoWidth: true, 
	                    sortable : true, 
	                  //  renderer : 'usMoney', 
	                    dataIndex: 'lName'
	                }
	                   ]
	               ,
	            stripeRows: true,
	             height: 150,
        		width: 1000,
	            title: 'Employee Detail'
		  	})
				simple.render(emp-Search);
 });