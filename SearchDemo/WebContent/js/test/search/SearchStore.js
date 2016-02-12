Ext.ns("Ext.test.search");

Ext.test.search.SearchStore = Ext.extend(Ext.data.Store, {
		
		autoDestroy: true,
		scope : this,
		autoLoad: false,
		//remoteSort: true,
		storeId: 'userStoreId',
		reader: new Ext.data.JsonReader({
				    totalProperty: 'total',
				    successProperty: 'success',
				    //errorProperty : 'errorMessage',
				    root: 'data',
				    /*fields: [	'firstName',
				    			'id',
				    			'email',
				    			'age',
				    			'registrationDate'
				    ]*/
				    fields: [
			                 {name: 'id', type: 'string', mapping: 'id'},
			                 {name: 'firstName', type: 'string', mapping: 'firstName'},
			                 {name: 'lastName', type: 'string', mapping: 'lastName'},
			                 {name: 'email', type: 'string', mapping: 'email'},
			                 {name: 'age',  type: 'int', mapping: 'age'},
			                 {name: 'registrationDate', type: 'java.util.Date', mapping: 'registrationDate'},
			                 {name: 'project', type: 'string', mapping: 'project'},
			                 {name: 'status', type: 'int', mapping: 'status'}
			               ]
			               
		}),		
		constructor: function(url){		
			
			this.proxy = new Ext.data.HttpProxy({
						method:'POST',
			    		url: url
			});			
			
			Ext.test.search.SearchStore.superclass.constructor.apply(this, arguments);			
		}	
});