Ext.ns("Ext.test.search");

Ext.test.search.EditForm = Ext.extend(Ext.FormPanel, {
	id: 'EditFormID',
	renderTo: document.body,
    //title: 'Employee Add Form',
    //height: 150,
    constructor : function() {
  	  var me = this;
  	  
  	  Ext.apply(this, {
  	   items : [ {
  	    xtype : 'panel',
  	    height:70,
	    layout : 'column',
	    border : true,
	    bodyStyle:'padding:15px 30px 10px',
	    
		  	 /*  //
		  	  items: [{
		          xtype: 'panel',
		          layout: 'column',
		          border : true,
		          //cls: 'bg_shd4 borBtm',
		          items: [{ 
		        	  xtype : 'numberfield',
		  	  	      id : 'id123',
		  	  	      emptyText : 'ID123',
		  	  	      name : 'ID',
		  	  	      value: 'ID',
		  	  	      width: '50px',
		  	  	      style: {
		  		                marginRight: '15px'
		  		             }},
		          {
		              xtype: 'displayfield',
		             // cls: 'marLeft2',
		              value: '<b style="color:red;">*</b>'
		          },]
		      }],
		  	   // */
  	 
  	   
  	    items : [{
  	    	  xtype : 'numberfield',
	  	  	      id : 'id',
	  	  	      emptyText : 'ID',
	  	  	      name : 'ID',
	  	  	      value: 'ID',
	  	  	      width: '50px',
	  	  	      disabled : true,
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
  	  	    	 text: 'Edit',
  	  	    	 width: 65,
  	  	    	style: {
		                marginRight: '25px'
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
             url: 'editData',
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
  	  	    			msg : "Record Edited Successfully",
  	  	    			buttons: Ext.MessageBox.OK,
  	  	                fn: function (buttonId, text, options) {
					
					//window.open('/SearchDemo/user/list'); // Opens new window
					document.location.href = "../user/list";     
				}

  	  	    	});
  	  	     },
  	  	     failure: function(resp, opts) {
  	  	    	Ext.MessageBox.show({
	  	    			msg : "Fail to Edit data",
	  	    			buttons: Ext.MessageBox.OK,
	  	    			fn: function (buttonId, text, options) {
  	    					
  	    					//window.open('/SearchDemo/user/list'); // Opens new window
  	    					document.location.href = "../user/list";      
  	    				}
		
  	  	    	});
  	  	     }
  	  	    });
  	  	     
  	  	 }    
  	   },{
  	    	 xtype: 'button',
	  	    	 text: 'Delete',
	  	    	 width: 65,
	  	    	style: {
	                marginRight: '25px'
	               },
	  	    	handler: function(){
	  	    		var ID = Ext.getCmp('id').getValue();
	  	    		
	  	      Ext.Ajax.request({
         url: 'deleteData',
         method: 'POST',
    
         params: {
        	     'id' : ID,
                

	  	     },
	  	     success: function(resp, opts)
	  	     {
	  	    	Ext.MessageBox.show({
	  	    			msg : "Record Deleted Successfully",
	  	    			buttons: Ext.MessageBox.OK,
	  	    				fn: function (buttonId, text, options) {
	  	    					
	  	    					//window.open('/SearchDemo/user/list'); // Opens new window
	  	    					document.location.href = "../user/list";      
	  	    				}
	  	    			
	  	    			
	  	    	
	  	    	});
	  	    	//window.location("/SearchDemo/user/list");
	  	    	
	  	     },
	  	     failure: function(resp, opts) {
	  	    	Ext.MessageBox.show({
  	    			msg : "Fail to Delete record",
  	    			buttons: Ext.MessageBox.OK,
  	    			fn: function (buttonId, text, options) {
	    					
	    					//window.open('/SearchDemo/user/list'); // Opens new window
	    					document.location.href = "../user/list";      
	    				}

	  	    	});
	  	     }
	  	    });
	  	     
	  	 }    
	   },{
  		   xtype: 'button',
	    	 text: 'Back',
	  	    	 width: 65,
	  	    	handler: function(){document.location.href = "../user/list";}
	   
	   }]
  	  }]
  	  });
  	Ext.test.search.EditForm.superclass.constructor.apply(this, arguments);
 },
 listeners: {
     afterrender: function(form) {
        
    	 Ext.Ajax.request({
             url: 'getUserById',
             method: 'POST',
             params: {
                 'id': document.getElementById('editId').innerHTML
             },
             success: function(response, options) {
            	// var rep = Ext.util.JSON.decode(Ext.util.Format.stripTags(response.responseText));
            	 var rep = Ext.util.JSON.decode(response.responseText);
            	 Ext.getCmp('id').setValue(rep.user.id);
            	 Ext.getCmp('fnameField').setValue(rep.user.firstName);
            	 Ext.getCmp('lnameField').setValue(rep.user.lastName);
            	 Ext.getCmp('emailId').setValue(rep.user.email);
            	 Ext.getCmp('age').setValue(rep.user.age);
            	 //Ext.getCmp('lnameField').setValue(rep.lastName);
            	 Ext.getCmp('project').setValue(rep.user.project);
            	 Ext.getCmp('status').setValue(rep.user.status);
            	 
             },
             failure: function(form, action) {
            	 Ext.getCmp('id').setValue('999');
            	 Ext.getCmp('fnameField').setValue('Something Went Wrong');
             }
         });
     }
 }
  
});