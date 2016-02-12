Ext.ns("Ext.test.search");
Ext.test.search.SearchResultGrid = Ext.extend(Ext.grid.GridPanel,{
	
	
    titleLinkRenderer: function(value) {
        return '<a href=javascript:void(0)>' + value + '</a>'; 
    }, 
	constructor : function(store) {
		var me = this;
		Ext.apply(this, {
			id : 'roleListGridId',
			cls : 'borTop',
			stateful: true,
	        stateId: 'grid',
			store : store,
			loadMask : true,
			
			
			
			columns : [ {
				id : 'Id',
				header : 'Id',
				//autoWidth : true,
				width : 50,
				sortable : true,
				align : 'right',
				dataIndex : 'id'
			}, {
				id : 'FirstName',
				header : 'First Name',
				//autoWidth : true,
				width : 100,
				sortable : true,
				align : 'right',
				dataIndex : 'firstName',
				renderer: this.titleLinkRenderer	
			}, {
				id : 'LastName',
				header : 'Last Name',
				//autoWidth : true,
				width : 100,
				sortable : true,
				align : 'right',
				dataIndex : 'lastName'
			}, {
				id : 'Email',
				header : 'Email',
				//autoWidth : true,
				align : 'right',
				width : 100,
				sortable : true,
				dataIndex : 'email'
			}, {
				id : 'Age',
				header : 'Age',
			//	autoWidth : true,
				align : 'right',
				width : 50,
				sortable : true,
				dataIndex : 'age'
			}, {
				id : 'RegistrationDate',
				header : 'Registration Date',
			//	autoWidth : true,
				sortable : true,
				align : 'right',
				width : 125,
				renderer : Ext.util.Format.dateRenderer('d/M/Y'),
				dataIndex : 'registrationDate'
			}, {
				id : 'Project',
				header : 'Project',
				//autoWidth : true,
				sortable : true,
				align : 'right',
				width : 100,
				dataIndex : 'project'
			}, {
				id : 'Status',
				header : 'Status',
			//	autoWidth : true,
				sortable : true,
				align : 'right',
				width : 75,
				 renderer :   function change(val) {
				        if (val == 1) {
				            return '<span style="color:green;">' + 'Active' + '</span>';
				        } else if (val == 0) {
				            return '<span style="color:red;">' +'InActive' + '</span>';
				        }
				        return val;
				    },
				dataIndex : 'status'
			},
			{
	             header:'Print',
	     		align : 'right',
	             icon:'../print_printer.png',
	             xtype: 'actioncolumn',width: 75,
	             handler: function(grid, rowIndex, colIndex) {
	                    var rec = store.getAt(rowIndex);
	                    myWindow=window.open('--EMS--',self.location,'width=800,height=500');
	                    myWindow.document.write("<BR><center>--------------------------------------");
	                    myWindow.document.write("<BR><B><center>Employee Management System</B>");
	                    myWindow.document.write("<BR>--------------------------------------</center>");
	                    myWindow.document.write("<BR><B>Employee Id:</B>&nbsp;"+rec.get('id'));
	                    myWindow.document.write("<BR><B>First Name:</B>&nbsp;"+rec.get('firstName'));
	                    myWindow.document.write("<BR><B>Last Name:</B>&nbsp;"+rec.get('lastName'));
	                    myWindow.document.write("<BR><B>Email:</B>&nbsp;"+rec.get('email'));
	                    myWindow.document.write("<BR><B>Age:</B>&nbsp;"+rec.get('age'));
	                    myWindow.document.write("<BR><B>Registration Date:</B>&nbsp;"+rec.get('registrationDate'));
	                    myWindow.document.write("<BR><B>Project:</B>&nbsp;"+rec.get('project'));
	                    myWindow.document.write("<BR><B>Status:</B>&nbsp;"+rec.get('status'));
	                    myWindow.document.write("<BR>--------------------------------------</center>");
	                    myWindow.document.write("<BR><CENTER>* System Generated Document.");
	                    myWindow.document.write("<BR>* Authorized by System. So, No need for Singnature</CENTER>");
	                    myWindow.print();
	                    //alert("Sell " + rec.get('fName'));
	                }
			}
			],
			bbar: new Ext.PagingToolbar({
	             pageSize: 10,
	             store: store,
	             displayInfo: true,
	             displayMsg: 'Displaying topics {0} - {1} of {2}',
	             emptyMsg: "No topics to display"

	         }),
//			height : 300,
			//collapsible : true,
			//animCollapse : false,
			 autoHeight: true,
			// autoWidth: true,
			loadMask : true

		});
		Ext.test.search.SearchResultGrid.superclass.constructor.apply(this,
				arguments);
	},
	
	listeners : {
		afterrender : function(view) {
			view.getStore().load();

		},
        cellclick: function(grid, rowIndex, columnIndex, e) {
            var record = grid.getStore().getAt(rowIndex); // Get the
            var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
            if (fieldName == 'firstName') {
                var viewForm = Ext.getBody().createChild({
                    tag: 'form',
                    cls: 'x-hidden',
                    id: 'form',
                    action: 'edit',
                    method: 'POST',
                    children: [{
                        tag: 'input',
                        name: 'id',
                        value: record.id,
                        type: 'hidden'
                    }]
                });
                viewForm.dom.submit();
            }
        }
	}
}
);