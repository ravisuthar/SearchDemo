
Ext.onReady(function() {

        Ext.QuickTips.init();

       
        var store = new Ext.data.ArrayStore
        ({
            fields: [
               {name: 'fName'},
               {name: 'lName'},
               {name: 'DOB'},
               {name: 'Age'},
               {name: 'company'},
               {name: 'email'},
               {name: 'gender'},
               {name: 'mobilenumber'},
               {name: 'qualification'}
            ]
        });
        
       

        Ext.test.search.empSearchMst =  Ext.extend(Ext.form.FormPanel)   
		 //var simple = new Ext.form.FormPanel
	({
        labelWidth: 100, // label settings here cascade unless overridden
        frame:true,
        region: 'center',
        title: 'Employee Form',
        bodyStyle:'padding:5px 5px 0',
       width: 360,
        defaults: {width: 230},
        //defaultType: 'textfield',
       //  renderTo: test,
		//renderTo:'test',
        renderTo:'emp-Search',
        items: [
        	new	Ext.form.TextField({
                fieldLabel: 'First Name',
                name: 'fName',
                id:'fName',
                emptyText: 'Please Enter First Name',
                allowBlank:true,
                regex: /([a-zA-Z\s]+)$/,
                regexText:'First Name should be in Charcters Only'
                }),
            new	Ext.form.TextField({
                fieldLabel: 'Last Name',
                id:'lName',
                emptyText: 'Please Enter Last Name',
                name: 'lName',
                regex: /([a-zA-Z\s]+)$/,
                regexText:'Last Name should be in Charcters Only'
            }),
            new Ext.form.DateField({fieldLabel: 'Birth Date',
                name: 'DOB',
                id:'DOB',
                format: 'd F Y',
                emptyText: 'Please Select Date of Birth',
                allowBlank:false,
                listeners: 
                    {
                    	'select': function(){
            			var curDate=new Date().getFullYear();
            			Ext.getCmp('Age').setValue((curDate-Ext.getCmp('DOB').getValue().format('Y')));
                    }
                 }
		}),
		new	Ext.form.TextField({fieldLabel: 'Age',
            name: 'Age',
            id:'Age',
            emptyText: 'Auto Calculated based on Date of Birth',
            allowBlank:true,
            readOnly:true
        }),
        new	Ext.form.TextField({
                fieldLabel: 'Company',
                id:'company',
                emptyText: 'Please Enter Company Name',
                name: 'company'
            }),
            new	Ext.form.TextField({
                fieldLabel: 'Email-ID',
                name: 'email',
                id:'email',
                vtype:'email',
                emptyText: 'Please Enter Email-ID'
            }),
			{
            xtype: 'radiogroup',
			id:'gender',
			name:'gender',
            fieldLabel: 'Gender',
            items: [
                {boxLabel: 'Male', name: 'rb-auto', inputValue: 'Male', checked: true},
                {boxLabel: 'Female', name: 'rb-auto', inputValue: 'Female'},
                ]
        },
			/*{
			xtype: 'radio',
            fieldLabel: 'Indian',
            inputValue:'Indian',
			columns: 2,
			name:'gender'
			},
			{
			xtype: 'radio',
            fieldLabel: 'Other',
            inputValue:'Other',
			columns: 2,
			name:'gender'
			},*/
			new	Ext.form.NumberField({
                fieldLabel: 'Mobile Number',
				id:'mobilenumber',
				emptyText: 'Please Enter Mobile Number',
                name: 'mobilenumber',
                maxLength:10,
                maxLengthText:'Mobile Number must be 10 Digits.',
                allowBlank:true
            	}),
			{
            // Use the default, automatic layout to distribute the controls evenly
            // across a single row
            xtype: 'checkboxgroup',
            fieldLabel: 'Qualification',
			id:'qualification',
			name:'qualification',
			columns: 2,
            items: [
                {boxLabel: 'B.C.A.', name: 'cb-auto-1', inputValue:'B.C.A'},
                {boxLabel: 'M.C.A.', name: 'cb-auto-2', inputValue:'M.C.A',checked: true},
                {boxLabel: 'B.E. I.T.', name: 'cb-auto-3',inputValue:'B.E. I.T.'},
                {boxLabel: 'B.Tech.', name: 'cb-auto-4',inputValue:'B.Tech.'},
                {boxLabel: 'M.Tech.', name: 'cb-auto-5',inputValue:'M.Tech.'}
            ]
        }
        
        ],
		

        buttons: [{
            text: 'Save',
	    handler: function()
	    {
				var cur=new Date().getFullYear();
				var temp=Ext.getCmp('qualification').getValue().length;
				var strQuali="";
				for(var i=0;i<temp;i++)
				{
					var actualData=Ext.getCmp('qualification').getValue()[i].inputValue;
					strQuali+=" - "+actualData;
				}	
				 var fName= Ext.getCmp('fName').getValue();
               var lName=  Ext.getCmp('lName').getValue();
                 var DOB=  Ext.getCmp('DOB').getValue().format('d F Y');
                 var Age=  Ext.getCmp('Age').getValue();
                  var company= Ext.getCmp('company').getValue();
                  var email= Ext.getCmp('email').getValue();
                  var gender= Ext.getCmp('gender').getValue().getEl().getValue();
                  var mobilenumber= Ext.getCmp('mobilenumber').getValue();


                  
                  
                  
				 var myData = [
			                     [[fName],[lName],[DOB],[Age],[company],[email],[gender],[mobilenumber],
				                   [strQuali]]
			                  ];
				alert('------------------->>>>>>>>>>>>>'+Ext.getCmp('grdEmp').getStore().getCount());
				 store.loadData(myData);
				 alert("sfjslkdjf 1");
	             simple.getForm().getEl().dom.action = 'EmS';
                // simple.getForm().getEl().dom.method = 'POST';
	             alert("sfjslkdjf 2");
				 simple.getForm().submit();
				 //window.location='/EmS';
				 alert("sfjslkdjf 3");
					//simple.getForm().reset();
            }
        },
        {
            text: 'Cancel',
            handler:function()
			{
        		Ext.MessageBox.confirm('Confirm', 'Are you sure you want to Cancel?',function(btn,text)
                {       
	        		if(btn=='yes')
	            	{
						window.close();
	        		}
        		});
        	}
        },{
			text: 'Reset',
			handler:function()
			{
        		Ext.MessageBox.confirm('Confirm', 'Are you sure you want to Reset?',function(btn,text){       		
	        		
	        		if(btn=='yes')
	            	{
						simple.getForm().reset();
	        		}
        		});
			}
		}]
    });
		/* var grid = new Ext.grid.GridPanel({
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
	                },
	                {
	                    header   : 'Date of Birth', 
	                    autoWidth: true, 
	                    sortable : true, 
	                  //  renderer : 'usMoney', 
	                    dataIndex: 'DOB'
	                },
	                {
	                    header   : 'Age', 
	                    autoWidth: true, 
	                    sortable : true, 
	                  //  renderer : 'usMoney', 
	                    dataIndex: 'Age'
	                },
	                {
	                    header   : 'Company Name', 
	                    autoWidth: true, 
	                    sortable : true, 
	                  //  renderer : 'usMoney', 
	                    dataIndex: 'company'
	                },
	                {
	                    header   : 'Email-Id', 
	                    autoWidth: true, 
	                    sortable : true, 
	                  //  renderer : 'usMoney', 
	                    dataIndex: 'email'
	                },
	                {
	                    header   : 'Gender', 
	                    autoWidth: true, 
	                    sortable : true, 
	                  //  renderer : 'usMoney', 
	                    dataIndex: 'gender'
	                },
	                {
	                    header   : 'Mobile Number', 
	                    autoWidth: true, 
	                    sortable : true, 
	                  //  renderer : 'usMoney', 
	                    dataIndex: 'mobilenumber'
	                },
	                {
		                id:'qualification',
	                    header   : 'Qualification', 
	                    autoWidth: true,  
	                    sortable : true,
	                  //  renderer : 'usMoney', 
	                    dataIndex: 'qualification'
	                }
	                   ]
	               ,
	            stripeRows: true,
	        	autoExpandColumn: 'qualification',
	             height: 150,
        		width: 1000,
	            title: 'Employee Detail',
	            renderTo:'emp-Search'
	            // config options for stateful behavior
	         //   stateful: true,
	         //   stateId: 'grid'
	        });*/
				//simple.render(emp-Search);
 });