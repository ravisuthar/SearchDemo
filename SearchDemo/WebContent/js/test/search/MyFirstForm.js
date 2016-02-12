Ext.ns("Ext.test.search");

Ext.test.search.MyFirstForm = Ext.extend(Ext.FormPanel, { //Ext.create('Ext.form.Panel', {
   
	id: 'myFirstForm',
	renderTo: document.body,
    title: 'Employee Add Form:',
    height: 150,
    constructor : function() {
  	  var me = this;
  	  
  	  Ext.apply(this, {
  	   items : [ {
  	    xtype : 'panel',
  	    height:70,
  	    layout : 'column',
  	    border : true,
  	    bodyStyle:'padding:15px 30px 10px',
  	    items : [{
  	    	  xtype : 'numberfield',
	  	  	      id : 'id',
	  	  	      emptyText : 'ID',
	  	  	      width: '50px',
	  	  	      style: {
	  		                marginRight: '15px'
	  		             }
	  	     },{
		  	      xtype : 'textfield',
		  	      id : 'fnameField',
		  	      emptyText : 'First Name',
		  	      width: '100px',
		  	      style: {
			                marginRight: '15px'
			   	         }
  	        },{
	  	  	      xtype : 'textfield',
	  	  	      id : 'lnameField',
	  	  	      emptyText : 'Last Name',
	  	  	      width: '100px',
	  	  	      style: {
	  		                marginRight: '15px'
	  		            }
  	  	     },{

  	  	  	      xtype : 'textfield',
  	  	  	      id : 'emailId',
  	  	  	      emptyText : 'Email ID',
  	  	  	      width: '100px',
  	  	  	      style: {
  	  		                marginRight: '15px'
  	  		            }
  	  	     },{
  	  	    	  xtype : 'numberfield',
  	  	  	      id : 'age',
  	  	  	      emptyText : 'Age',
  	  	  	      width: '50px',
  	  	  	      style: {
  	  		                marginRight: '15px'
  	  		             }
  	  	     },{
  	  	  	      xtype : 'textfield',
  	  	  	      id : 'project',
  	  	  	      emptyText : 'Project',
  	  	  	      width: '100px',
  	  	  	      style: {
  	  		                marginRight: '15px'
  	  		             }
  	  	     },{
  	  	    	  xtype : 'numberfield',
  	  	  	      id : 'status',
  	  	  	      emptyText : 'Status',
  	  	  	      width: '100px',
  	  	  	      style: {
  	  		                marginRight: '15px'
  	  		             }
  	  	     },{
  	  	    	 xtype: 'button',
  	  	    	 text: 'Add',
  	  	    	 width: 65,
  	  	    	style: {
		                marginRight: '20px'
		             },
  	  	    	handler: function(){
  	  	    		var ID = Ext.getCmp('id').getValue();
  	  	    		var FirstName = Ext.getCmp('fnameField').getValue();
  	  	    		var LastName = Ext.getCmp('lnameField').getValue();
  	  	    		var EmailID = Ext.getCmp('emailId').getValue();
  	  	    		var Age = Ext.getCmp('age').getValue();
  	  	    	    //var dt = Ext.util.Format.date(new Date());
  	  	    		var Date = null;//dt.format(Date.patterns.ShortDate);
  	  	    		var Project = Ext.getCmp('project').getValue();
  	  	    		var Status = Ext.getCmp('status').getValue();
  	  	    	
  	  	     
  	  	      Ext.Ajax.request({
             url: 'insertData',
             method: 'POST',
             //loadMask : true,
             params: {
            	     'id' : ID,
	                 'firstName' : FirstName.trim(),
	                 'lastName' : LastName.trim(),
	                 'email' : EmailID.trim(),
	                 'age' : Age,
	                 'registrationDate' : Date,
	                 'project' : Project.trim(),
	                 'status' : Status

  	  	     },
  	  	   /* jsonData: {
  	  	    	     "id" : ID,
  	                 "firstName" : FirstName.trim(),
  	                 "lastName" : LastName.trim(),
  	                 "email" : EmailID.trim(),
  	                 "age" : Age,
  	                 "registrationDate" : Date,
  	                 "project" : Project.trim(),
  	                 "status" : Status
  	         },*/
  	  	     success: function(resp, opts)
  	  	     {
  	  	    	Ext.MessageBox.show({
  	  	    			msg : "Record Added Succesfully..!!",
  	  	    			buttons: Ext.MessageBox.OK,
  	  	    		fn: function (buttonId, text, options) {
	    					
	    					//window.open('/SearchDemo/user/list'); // Opens new window
	    					document.location.href = "../user/list";      
	    				}
  	  	    	});
  	  	     },
  	  	     failure: function(resp, opts) {
  	  	    	Ext.MessageBox.show({
	  	    			msg : "Fail to Add",
	  	    			buttons: Ext.MessageBox.OK,
	  	    			fn: function (buttonId, text, options) {
  	    					
  	    					//window.open('/SearchDemo/user/list'); // Opens new window
  	    					document.location.href = "../user/list";      
  	    				}		
  	  	    	});
  	  	     }
  	  	    });
  	  	     
  	  	 }    
  	   }, {
  		   xtype: 'button',
	    	 text: 'Back',
	  	    	 width: 65,
	  	    	handler: function(){document.location.href = "../user/list";}
  	   
  	   }]
  	   }]
  	  });
  	Ext.test.search.MyFirstForm.superclass.constructor.apply(this, arguments);
 }
  
});