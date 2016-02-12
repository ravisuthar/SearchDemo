Ext.ns("Ext.bridgex");
var pageSize;
Ext.bridgex.ApplicationComponent = function() {
    var PAGING_COMBO_DATA = null;
    var APPLICATION_PAGE_SIZE = null;
    var WIDGET_PAGE_SIZE = null;
    var langFooterMessage = null;
    var langFooterMessagePage = null;

    function getPagingCombo(id) {
        return new Ext.form.ComboBox({
            id: 'x-applicationcmp-pagingcombo-' + id,
            width: 40,
            store: new Ext.data.ArrayStore({
                fields: ['id'],
                data: PAGING_COMBO_DATA
            }),
            mode: 'local',
            value: '10',
            style: 'top:1px;',
            listWidth: 40,
            triggerAction: 'all',
            displayField: 'id',
            valueField: 'id',
            editable: false,
            forceSelection: true
        });
    }

    function init() {
        PAGING_COMBO_DATA = [
            ['10'],
            ['25'],
            ['50']
        ];
        APPLICATION_PAGE_SIZE = 10;
        WIDGET_PAGE_SIZE = 10;
        langFooterMessage = Ext.BUNDLE.getMsg('Grid.Pagination.Footer.message');
        langFooterMessagePage = Ext.BUNDLE.getMsg('Grid.Pagination.Footer.message.page');
    }

    function initTemplates() {
        this.listViewTemplate = new Ext.XTemplate('<ul>', '<tpl for=".">', '<li class="x-csc-list">', '{item} ', '</li>', '</tpl>', '</ul>');
        this.listViewTemplate.compile();
    }
    return {
        getPagingToolbarWithCombo: function(store, id) {
            init();
            var combo = getPagingCombo(id);
            var bbar = new Ext.PagingToolbar({
                id: 'x-applicationcmp-grid-pagingtoolbar-' + id,
                pageSize: APPLICATION_PAGE_SIZE,
                store: store,
                displayInfo: true,
                displayMsg: 'Displaying {0} - {1} of {2}',
                emptyMsg: langFooterMessage,
                items: ['-', langFooterMessagePage, combo]
            });
            combo.on('select', function(combo, record) {
                pageSize = parseInt(record.get('id'), APPLICATION_PAGE_SIZE);
                bbar.pageSize = pageSize;
                store.load({
                    params: {
                        start: 0,
                        limit: pageSize
                    }
                });
            }, this);
            return bbar;
        },
        getSalesDocBbar:function(myGrid,store){
        	var me = myGrid;
        	var bbar = new Ext.PagingToolbar({
                pageSize: Ext.SALES_DOC_PAGING_SIZE,
                store: store,
                displayInfo: true,
                displayMsg: 'Displaying {0} - {1} of {2}',
                emptyMsg: Ext.BUNDLE.getMsg('Grid.Pagination.Footer.message')
            });
        	return bbar;
        },
        getPagingToolbar: function(store, componentId, pageSize,myGrid) {
            init();
            var pageSize = (typeof pageSize != undefined) ? pageSize : APPLICATION_PAGE_SIZE;
            return new Ext.PagingToolbar({
                pageSize: pageSize,
                store: store,
                displayInfo: true,
                displayMsg: 'Displaying {0} - {1} of {2}',
                emptyMsg: langFooterMessage,
                listeners: {}
            });
        },
        getWidgetPagingToolbar: function(store) {
            init();
            return new Ext.PagingToolbar({
                pageSize: WIDGET_PAGE_SIZE,
                store: store,
                displayInfo: true,
                displayMsg: 'Displaying {0} - {1} of {2}',
                emptyMsg: langFooterMessage
            });
        },
        getListView: function(store, itemclickfunction) {
            return new Ext.DataView({
                store: store,
                tpl: new Ext.XTemplate('<ul>', '<tpl for=".">', '<li class="x-csc-list">', '{title}', '</li>', '</tpl>', '</ul>'),
                itemSelector: 'li.x-csc-list',
                overClass: 'x-csc-list-hover',
                singleSelect: true,
                multiSelect: false,
                autoScroll: true,
                listeners: {
                    render: function(view) {
                        store.load();
                    },
                    click: function(view, index, node, e) {
                        itemclickfunction(view.store.data.items[index]);
                    }
                }
            });
        },
        getListLinkView: function(appMessage, store, itemclickfunction) {
            return new Ext.DataView({
                store: store,
                tpl: new Ext.XTemplate('<ul>', '<tpl for=".">', '<li class="x-csc-link">', '{linkname}', '</li>', '</tpl>', '</ul>'),
                itemSelector: 'li.x-csc-link',
                overClass: 'x-csc-list-hover cursor',
                singleSelect: true,
                multiSelect: false,
                autoScroll: true,
                listeners: {
                    render: function(view) {
                        store.load({
                            callback: function(records, options, success) {
                                if (Ext.bridgex.ApplicationComponent.showMessageFromStore(appMessage, store, 'quickLinkDetailMessageId', 'information216')) {
                                    return;
                                }
                            }
                        });
                    },
                    click: function(view, index, node, e) {
                        itemclickfunction(view.store.data.items[index]);
                    }
                }
            });
        },
        getDetailSizeGridView: function(data) {
            /*
             * Sample Data to Generate this Size Grid View
             * 
             *	var data = {
             *			"NAME": "GRID_SIZE",
             *			"FIELDS":[
             *					{"NAME":"GRID_SIZE", LABEL: "Size"},
             *					{"NAME":"TOTAL_QUANTITY", LABEL: "Total Quantity"},
             *					{"NAME":"DRAWN_QUANTITY", LABEL: "Drawn Quantity"},
             *					{"NAME":"RMAINING_QUANTITY", LABEL: "Remaining Quantity"}
             *			], 
             *			"ROWS":[
             *				{"GRID_SIZE":"X", "TOTAL_QUANTITY":20, "DRAWN_QUANTITY":10, "RMAINING_QUANTITY":30},
             *				{"GRID_SIZE":"XL", "TOTAL_QUANTITY":10, "DRAWN_QUANTITY":20, "RMAINING_QUANTITY":14}
             *			]
             *	};
             */
            var sizeGridTplPanel = new Ext.Panel({
                border: false,
                listeners: {
                    render: function() {
                        var integerFieldList = ['QUANTITY', 'DRAWN_QUANTITY', 'REMAINING_QUANTITY', 'TOTAL_QUANTITY'];
                        var tpl = new Ext.XTemplate('<ul>', '<div id="tablecontainer">', '<tpl for="FIELDS">', '<div class="tablecontainerrow">', '<div class="header">{LABEL}</div>', '</div>', '</tpl>', '</div>', '<tpl for="ROWS">', '<tpl exec="values.parent = parent;"></tpl>', '<div id="tablecontainer">', '<tpl for="parent.FIELDS">', '<div class="tablecontainerrow">', '<tpl if="this.isHeaderField(parent.parent.NAME, values) == true">', '<div class="column1">{[this.getDataValue(parent, values)]}</div>', '</tpl>', '<tpl if="this.isHeaderField(parent.parent.NAME, values) == false">', '<div class="column2">{[this.getDataValue(parent, values)]}</div>', '</tpl>', '</div>', '</tpl>', '</div>', '</div>', '</tpl>', '</ul>', {
                            isHeaderField: function(parent, values) {
                                return parent == values.NAME ? true : false;
                            },
                            getDataValue: function(parent, values) {
                                var val = parent[values.NAME];
                                if (integerFieldList.indexOf(values.NAME) != -1) {
                                    val = Ext.util.Format.number(val, '0');
                                }
                                return val;
                            }
                        });
                        tpl.overwrite(sizeGridTplPanel.body, data);
                        sizeGridTplPanel.body.highlight('#c3daf9', {
                            block: true
                        });
                    }
                }
            });
            return sizeGridTplPanel;
        },
        getReviewDetailSizeGridView: function(data) {
            var sizeGridTplPanel = new Ext.Panel({
                border: false,
                listeners: {
                    render: function() {
                        var orderIntegerFieldList = ['quantity', 'drawnQuantity', 'remainingQuantity', 'confirmQuantity'];
                        var dateFieldList = ['confirmDate'];
                        var tpl = new Ext.XTemplate('<ul>', '<div id="tablecontainer">', '<tpl for="FIELDS">', '<div class="tablecontainerrow">', '<div class="header">{LABEL}</div>', '</div>', '</tpl>', '</div>', '<tpl for="ROWS">', '<tpl exec="values.parent = parent;"></tpl>', '<div id="tablecontainer">', '<tpl for="parent.FIELDS">', '<div class="tablecontainerrow">', '<tpl if="this.isHeaderField(parent.parent.NAME, values) == true">', '<div class="column1">{[this.getDataValue(parent, values)]}</div>', '</tpl>', '<tpl if="this.isHeaderField(parent.parent.NAME, values) == false">', '<div class="column2">{[this.getDataValue(parent, values)]}</div>', '</tpl>', '</div>', '</tpl>', '</div>', '</div>', '</tpl>', '</ul>', {
                            isHeaderField: function(parent, values) {
                                return parent == values.NAME ? true : false;
                            },
                            getDataValue: function(parent, values) {
                                var val = parent[values.NAME];
                                if (orderIntegerFieldList.indexOf(values.NAME) != -1) {
                                    val = Ext.util.Format.number(val, '0');
                                }
                                return val;
                            }
                        });
                        tpl.overwrite(sizeGridTplPanel.body, data);
                        sizeGridTplPanel.body.highlight('#c3daf9', {
                            block: true
                        });
                    }
                }
            });
            return sizeGridTplPanel;
        },
        showMessageFromResponse: function(appMessage, response, errorId, errorType, isWidget) {
            if (response != undefined && response.success != undefined && (response.success == true || response.success == 'true')) {
                return false;
            } else {
                errorId = errorId != undefined ? errorId : 'errorMsgId';
                if (errorType == undefined || errorType == '') {
                    if (response != undefined && response.errorCode != undefined && response.errorCode == 1) {
                        if (isWidget != undefined && isWidget == true) {
                            errorType = 'widgetInformation';
                        } else {
                            errorType = 'information';
                        }
                    } else {
                        if (isWidget != undefined && isWidget == true) {
                            errorType = 'widgetError';
                        } else {
                            errorType = 'error';
                        }
                    }
                }
                errorType = errorType != undefined ? errorType : 'error';
                var error = {
                    type: errorType,
                    message: '',
                    id: errorId
                };
                if (response != undefined && response.errorMessage != undefined && response.errorMessage != '') {
                    if (Ext.BUNDLE.data.containsKey(response.errorMessage)) {
                        error.message = Ext.BUNDLE.getMsg(response.errorMessage);
                    } else {
                        error.message = response.errorMessage;
                    }
                } else {
                    error.message = Ext.BUNDLE.getMsg('ErrorMessge.CUST360_MSG_UI_FAILURE');
                }
                appMessage.showMessage(error);
                return true;
            }
        },
        showMessageFromStore: function(appMessage, store, errorId, errorType, isWidget) {
            if (store.reader != undefined && store.reader.jsonData != undefined && (store.reader.jsonData.success == true || store.reader.jsonData.success == 'true')) {
                return false;
            } else {
                errorId = errorId != undefined ? errorId : 'errorMsgId';
                if (errorType == undefined || errorType == '') {
                    if (store.reader.jsonData != undefined && store.reader.jsonData.errorCode != undefined && store.reader.jsonData.errorCode == 1) {
                        if (isWidget != undefined && isWidget == true) {
                            errorType = 'widgetInformation';
                        } else {
                            errorType = 'information';
                        }
                    } else {
                        if (isWidget != undefined && isWidget == true) {
                            errorType = 'widgetError';
                        } else {
                            errorType = 'error';
                        }
                    }
                }
                errorType = errorType != undefined ? errorType : 'error';
                var error = {
                    type: errorType,
                    message: '',
                    id: errorId
                };
                if (store.reader != undefined && store.reader.jsonData != undefined && store.reader.jsonData.errorMessage != undefined && store.reader.jsonData.errorMessage != '') {
                    if (Ext.BUNDLE.data.containsKey(store.reader.jsonData.errorMessage)) {
                        error.message = Ext.BUNDLE.getMsg(store.reader.jsonData.errorMessage);
                    } else {
                        error.message = store.reader.jsonData.errorMessage;
                    }
                } else {
                    error.message = Ext.BUNDLE.getMsg('ErrorMessge.CUST360_MSG_UI_FAILURE');
                }
                appMessage.showMessage(error);
                return true;
            }
        },
        showErrorMessage: function(appMessage, errrorMsg, errorId, errorType) {
            errorId = errorId != undefined ? errorId : 'errorMsgId';
            errorType = (errorType != undefined && errorType != '') ? errorType : 'error';
            errrorMsg = errrorMsg != undefined ? errrorMsg : Ext.BUNDLE.getMsg('ErrorMessge.CUST360_MSG_UI_FAILURE');
            var error = {
                type: errorType,
                message: errrorMsg,
                id: errorId
            };
            appMessage.showMessage(error);
            return true;
        },
        showMessageFromStore4: function(appMessage, store, errorId, errorType, isWidget) {
            if (store.proxy.reader != undefined && store.proxy.reader.jsonData != undefined && (store.proxy.reader.jsonData.success == true || store.proxy.reader.jsonData.success == 'true')) {
                return false;
            } else {
                errorId = errorId != undefined ? errorId : 'errorMsgId';
                if (errorType == undefined || errorType == '') {
                    if (store.proxy.reader.jsonData != undefined && store.proxy.reader.jsonData.errorCode != undefined && store.proxy.reader.jsonData.errorCode == 1) {
                        if (isWidget != undefined && isWidget == true) {
                            errorType = 'widgetInformation';
                        } else {
                            errorType = 'information';
                        }
                    } else {
                        if (isWidget != undefined && isWidget == true) {
                            errorType = 'widgetError';
                        } else {
                            errorType = 'error';
                        }
                    }
                }
                errorType = errorType != undefined ? errorType : 'error';
                var error = {
                    type: errorType,
                    message: '',
                    id: errorId
                };
                if (store.proxy.reader != undefined && store.proxy.reader.jsonData != undefined && store.proxy.reader.jsonData.errorMessage != undefined && store.proxy.reader.jsonData.errorMessage != '') {
                    if (Ext.BUNDLE.data.containsKey(store.proxy.reader.jsonData.errorMessage)) {
                        error.message = Ext.BUNDLE.getMsg(store.proxy.reader.jsonData.errorMessage);
                    } else {
                        error.message = store.proxy.reader.jsonData.errorMessage;
                    }
                } else {
                    error.message = Ext.BUNDLE.getMsg('ErrorMessge.CUST360_MSG_UI_FAILURE');
                }
                appMessage.showMessage(error);
                return true;
            }
        },
        /** ======== CUSTOMER SEARCH PANEL =========== **/
        customerSearchPanel: function(customerNumber, customerName, gridMap, userType, pageRefresh, reloadData) {
            pageRefresh = (pageRefresh != undefined && pageRefresh != '') ? pageRefresh : false;
            reloadData = (reloadData != undefined && reloadData != '') ? reloadData : false;
            if (document.getElementById("customersearchid") != null) {
                document.getElementById("customersearchid").innerHTML = '';
                if (userType == 'internal' || userType == 'Internal') {
                    Ext.bridgex.ApplicationComponent.changeCustomerPanel(customerNumber, customerName, gridMap, userType, pageRefresh, reloadData);
                } else { // External User
                    Ext.Ajax.request({
                        url: '../home/setCurrentCustomer',
                        method: 'POST',
                        params: {
                            'customerNumber': customerNumber,
                            'customerName': customerName
                        },
                        success: function(response, options) {
                            if (response.responseText == true || response.responseText == 'true') {
                                Ext.bridgex.ApplicationComponent.changeCustomerPanel(customerNumber, customerName, gridMap, userType, pageRefresh, reloadData);
                            } else {
                                document.getElementById("customersearchid").style.color = "red";
                                document.getElementById("customersearchid").innerHTML = Ext.BUNDLE.getMsg('ErrorMessge.CUST360_MSG_UI_FAILURE');
                            }
                        },
                        failure: function(form, action) {
                            document.getElementById("customersearchid").style.color = "red";
                            document.getElementById("customersearchid").innerHTML = Ext.BUNDLE.getMsg('ErrorMessge.CUST360_MSG_UI_FAILURE');
                        }
                    });
                }
            }
        },
        changeCustomerPanel: function(customerNumber, customerName, gridMap, userType, pageRefresh, reloadData) {
            pageRefresh = (pageRefresh != undefined && pageRefresh != '') ? pageRefresh : false;
            reloadData = (reloadData != undefined && reloadData != '') ? reloadData : false;
            var customerSearchPanel = new Ext.Panel({
                items: [{
                    id: 'customerSearchPanel',
                    cls: 'bgcor1 userName',
                    layout: 'hbox',
                    items: [{
                        xtype: 'displayfield',
                        cls: 'marRight5 padLeft10',
                        value: '<b>' + Ext.BUNDLE.getMsg('Label.You.Are.Viewing') + '</b> &nbsp;' + customerNumber + " - " + customerName
                    }, {
                        xtype: 'spacer',
                        width: 3
                    }, {
                        xtype: 'box',
                        autoEl: {
                            tag: 'a',
                            href: '#',
                            cls: 'changeCustomerLinkFont',
                            cn: Ext.BUNDLE.getMsg('Label.Change.Customer.Link')
                        },
                        listeners: {
                            afterrender: function(view) {
                                view.getEl().on('click', function() {
                                    if (userType == 'internal' || userType == 'Internal') {
                                        window.location = '../salesrep/home';
                                    } else {
                                        var changeCustomerPopup = new Ext.bridgex.b2b.ChangeCustomerPopup(gridMap, userType, pageRefresh);
                                        changeCustomerPopup.show(this);
                                    }
                                });
                            }
                        }
                    }]
                }]
            }); /**  CODE TO REFRESH GRID **/
            if (reloadData != undefined && reloadData && typeof gridMap != 'undefined' && gridMap != null && gridMap.getCount() > 0) {
                gridMap.each(function(item) {
                    if (typeof item != 'undefined') {
                        if (typeof item.appMessage != 'undefined' && item.appMessage != null) {
                            item.appMessage.hide();
                        }
                        if (typeof item.store != 'undefined' && item.store != null) {
                            if (item.store.getCount() > 0) {
                                item.store.removeAll();
                                item.store.reload();
                            }
                        }
                        if (typeof item.fn != 'undefined' && item.fn != null) {
                            item.fn(item.appMessage);
                        }
                    }
                });
            }
            customerSearchPanel.render('customersearchid');
        },
        setProductSearchPageHeight: function(pageSize, groupSize) {
            var byAttributePanel = Ext.getCmp('byattributepanelid');
            var height = parseInt((pageSize * 34) + (groupSize * (33)) + 510);
            //   var height = parseInt((pageSize * 35) + (groupSize * (35)) + 410);
            byAttributePanel.setHeight(height);
            byAttributePanel.doLayout();
            return true;
        },
        setThumbnailPageHeight1: function(pageSize, groupSize) {
            var byAttributePanel = Ext.getCmp('byattributepanelid');
            var height = parseInt((pageSize * 57) + (groupSize * 30) + 510);
            byAttributePanel.setHeight(height);
            byAttributePanel.doLayout();
            return true;
        },
        setColorGridHeight: function(pageSize, groupSize) {
            var byAttributePanel = Ext.getCmp('byattributepanelid');
            var height = parseInt((pageSize * 57) + (groupSize * 30) + 510);
            // var height = parseInt(grid.getHeight()+(pageSize * 57) + (groupSize * 30) + 410);           
            byAttributePanel.setHeight(height);
            byAttributePanel.doLayout();
            return true;
        },
        setColorGridHeight1: function(pageSize, groupSize) {
            var byAttributePanel = Ext.getCmp('byattributepanelid');
            //  var height = parseInt((grid.getHeight())+(pageSize * 35) + (groupSize * 35) + 410);
            var height = parseInt((pageSize * 34) + (groupSize * (33)) + 510);
            byAttributePanel.setHeight(height);
            byAttributePanel.doLayout();
            return true;
        },
        formatFormData: function(myForm) {
            var formValues = myForm.getForm().getValues();
            for (prop in formValues) {
                var field = myForm.find('name', prop)[0];
                if (field != undefined) {
                    var extyText = field.emptyText;
                    if (field != undefined && extyText != undefined) {
                        if (formValues[prop].replace('+', '') == extyText.replace('+', '')) {
                            formValues[prop] = '';
                        }
                    }
                }
                formValues[prop] = formValues[prop].trim();
            }
            myForm.getForm().setValues(formValues);
        },
        getHelpTool: function(code) {
            return {
                id: 'help',
                handler: function(e, target, panel) {
                    Ext.Ajax.request({
                        url: '../help/getHelpContent',
                        method: 'POST',
                        params: {
                            'widgetCode': code
                        },
                        success: function(action, options) {
                            var response = Ext.util.JSON.decode(action.responseText);
                            if (response.success != undefined && response.success == 'true' && response.data.resultList.length > 0) {
                                var HelpPopup = new Ext.bridgex.b2b.DashBoardHelpPopup(response.data.resultList[0].helpContent, response.data.resultList[0].applicationName);
                                HelpPopup.show(this);
                            } else {
                                Ext.MessageBox.alert('Error', Ext.BUNDLE.getMsg("HelpPopup.content.noRecords"));
                                //                                var HelpPopup = new Ext.bridgex.b2b.DashBoardHelpPopup(Ext.BUNDLE.getMsg("Label.noRecords"));
                                //                                HelpPopup.show(this);
                            }
                        }
                    });
                }
            };
        },
        customMoneyRenderer: function(originalValue, currrency) {
            if (currrency != undefined && currrency != null && currrency != '') {
                originalValue = originalValue.toString().replace(currrency, '');
            }
            var value = Ext.util.Format.usMoney(originalValue);
            value = value.replace('$', '');
            if (currrency != undefined && currrency != null && currrency != '') {
                value = value.toString().replace(currrency, '');
                value = value + ' ' + currrency;
            }
            return value;
        },
        selectBrand: function(brandNo) {
            Ext.Ajax.request({
                url: '../home/brand/' + brandNo,
                method: 'GET',
                success: function(response, options) {
                    if (Ext.ORDER_APPLIATION != undefined && Ext.ORDER_APPLIATION == true) {
                        Ext.customjavascriptfiles.b2b.ordercreation.OrderComponent.saveAndLoad(Ext.ACTIVE_STEP);
                    } else {
                        var currentUrl = document.getElementById('menuSelectedUrlDiv').innerHTML;
                        if (currentUrl == "../home/deniedBrand" || currentUrl == "../home/denied") {
                            window.location = "../connectafs/v13";
                        } else {
                            window.location.reload();
                        }
                    }
                }
            });
        },
        rejectBrand: function(brandNo) {
            Ext.Ajax.request({
                url: '../home/brand/' + brandNo,
                method: 'GET',
                success: function(response, options) {
                    var viewForm = Ext.getBody().createChild({
                        tag: 'form',
                        cls: 'x-hidden',
                        action: '../home/deniedBrand',
                        method: 'POST'
                    });
                    viewForm.dom.submit();
                }
            });
        },
        previewTheme: function(themeNo) {
            Ext.Ajax.request({
                url: '../managetheme/preview/' + themeNo,
                method: 'GET',
                success: function(response, options) {
                    window.location.reload();
                }
            });
        },
        stopPreviewTheme: function() {
            Ext.Ajax.request({
                url: '../managetheme/stopPreview/',
                method: 'GET',
                success: function(response, options) {
                    window.location.reload();
                }
            });
        },
        handleSelectDeselect: function(sm, myGrid) {
            sm.on({
                'rowselect': function(sm, row_index, record) {
                    var gridObj = myGrid.getView();
                    var colIndex = myGrid.getColumnModel().getIndexById('checker');
                    var headerCell = myGrid.getView().getHeaderCell(colIndex);
                    var headerCB = Ext.getDom(headerCell).childNodes[0];
                    var isChecked = Ext.fly(headerCB).hasClass('x-grid3-hd-checker-on');
                    if (isChecked) {
                        var els = Ext.select('.x-grid3-row-checker', myGrid.getView());
                        els.each(function(el) {
                            var checkBox = new Ext.Component(el.dom);
                            checkBox.setDisabled(true);
                        });
                    }
                },
                'rowdeselect': function(sm, row_index, record) {
                    var gridObj = myGrid.getView();
                    var colIndex = myGrid.getColumnModel().getIndexById('checker');
                    var headerCell = myGrid.getView().getHeaderCell(colIndex);
                    var headerCB = Ext.getDom(headerCell).childNodes[0];
                    var isChecked = Ext.fly(headerCB).hasClass('x-grid3-hd-checker-on');
                    if (!isChecked) {
                        var els = Ext.select('.x-grid3-row-checker', myGrid.getView());
                        els.each(function(el) {
                            var checkBox = new Ext.Component(el.dom);
                            checkBox.setDisabled(false);
                        });
                    }
                }
            });
        },
        isAllSelected: function(grid) {
            var gridObj = grid.getView();
            var colIndex = grid.getColumnModel().getIndexById('checker');
            var headerCell = grid.getView().getHeaderCell(colIndex);
            var headerCB = Ext.getDom(headerCell).childNodes[0];
            return Ext.fly(headerCB).hasClass('x-grid3-hd-checker-on');
        },
        getSalesDocUrl: function(methodCodeId, docCategoryId) {
            methodCodeId = methodCodeId * 1;
            var urlMap = new Ext.util.MixedCollection();
            urlMap.add(21, '../draftsalesdoc/fromsapcontract');
            urlMap.add(22, '../draftsalesdoc/fromsapquotation');
            urlMap.add(4, '../draftsalesdoc/closeoutorder');
            urlMap.add(11, '../contract/closeoutcontract');
            urlMap.add(13, '../contract/contractfromquotation');
            if (urlMap.containsKey(methodCodeId)) {
                return urlMap.get(methodCodeId);
            } else {
                if (docCategoryId != undefined) {
                    docCategoryId = docCategoryId * 1;
                    if (docCategoryId == 1) {
                        return '../quotations/add';
                    } else if (docCategoryId == 2) {
                        return '../contract/create';
                    } else {
                        return '../draftsalesdoc/createorder';
                    }
                }
            }
        }
    };
}();