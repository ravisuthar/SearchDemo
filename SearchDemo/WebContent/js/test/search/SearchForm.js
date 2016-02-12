Ext.ns("Ext.test.search");
Ext.test.search.SearchForm = Ext.extend(Ext.FormPanel, {
    id: 'myCustomForm',
    width: 500,
    constructor: function() {
        var me = this;

        Ext.apply(this, {
            items: [{
                xtype: 'panel',
                height: 70,
                layout: 'column',
                border: true,
                bodyStyle: 'padding:15px 30px 10px',
                items: [{
                    xtype: 'label',
                    text: 'Employee:',
                    width: 80,
                    style: {
                        marginRight: '30px'
                    }
                }, {
                    xtype: 'textfield',
                    id: 'searchField',
                    emptyText: 'Enter Text',
                    style: {
                        marginRight: '20px'
                    },
                    listeners: {
                        specialkey: function(field, e) {
                            if (e.getKey() == e.ENTER) {
                            	var store = Ext.getCmp('roleListGridId').getStore();
                                store.setBaseParam('searchParam', Ext.getCmp('searchField').getValue());
                                store.load();
                            }
                        }
                    }
                }, {
                    text: 'Search',
                    xtype: 'button',
                    style: {
                        marginRight: '20px'
                    },
                    handler: function() {
                        var store = Ext.getCmp('roleListGridId').getStore();
                        store.setBaseParam('searchParam', Ext.getCmp('searchField').getValue());
                        store.load();

                    }
                }, {
                    text: 'Add Employee',
                    xtype: 'button',
                    handler: function() {

                        var viewForm = Ext.getBody().createChild({
                            tag: 'form',
                            cls: 'x-hidden',
                            id: 'form',
                            action: 'add',
                            method: 'POST',
                            children: [{
                                tag: 'input',
                                //  name: 'id',
                                //  value: record.id,
                                type: 'hidden'
                            }]
                        });
                        viewForm.dom.submit();


                    }
                }]
            }]


        });
        Ext.test.search.SearchForm.superclass.constructor.apply(this, arguments);
    }
});
//Ext.reg('myCustomForm', Ext.custom.CustomForm);