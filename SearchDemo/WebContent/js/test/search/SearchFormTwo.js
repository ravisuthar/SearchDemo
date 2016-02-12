Ext.ns("Ext.test.search");
Ext.test.search.SearchFormTwo = Ext.extend(Ext.FormPanel, {
    id: 'myCustomFormTwo',
    width: 500,
    constructor : function() {
    	  var me = this;
    	  
    	  Ext.apply(this, {
    	   items : [ {
    	    xtype : 'panel',
    	    height:70,
    	    layout : 'column',
    	    border : true,
    	    bodyStyle:'padding:15px 30px 10px',
    	    items : [ {
    	      xtype : 'label',
    	      text : 'Employee:',
    	      width:80,
    	      style: {
    	                marginRight: '30px'
    	            }
    	     }, {
    	      xtype : 'textfield',
    	      id : 'searchField',
    	      emptyText : 'Enter Text',
    	      style: {
	                marginRight: '20px'
	            },
    	     listeners : {}
    	     },{
    	     text : 'Search',
    	     xtype : 'button',
    	     /*handler : function() {
    	      var store = Ext.getCmp('roleListGridId').getStore();
    	      store.setBaseParam('searchParam', Ext.getCmp('searchField')
    	        .getValue());
    	      store.load();
    	     
    	     }*/
    	    }  ]
    	   } ]


    	  });
    	  Ext.test.search.SearchForm.superclass.constructor
    	    .apply(this, arguments);
    	 }
});
//Ext.reg('myCustomForm', Ext.custom.CustomForm);