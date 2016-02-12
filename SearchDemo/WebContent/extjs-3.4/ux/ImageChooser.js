/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
var ImageChooser = function(config) {
        this.config = config;
    }

ImageChooser.prototype = {
    // cache data by image name for easy lookup
    langImage: 'Image',
    langChooseImage: 'Choose Image',
    langUpload: 'Upload',
    langSelectImage: 'Select an Image',
    langImageName: this.langImage + ' Name',
    langBtnOk: 'Ok',
    langBtnCancel: 'Cancel',
    langBtnSendItToServer: 'Send It to Server',
    langUploadingMessage: 'Uploading...',
    langUploadSuccessMsg: 'Image Uploaded Successfully',
    langUploadFailureMsg: 'Image Upload Failed',
    langImageLoadMsg: '',
    lookup: {},
    fileextensions: ['jpg', 'jpeg', 'png', 'gif', 'ico', 'PNG', 'GIF', 'JPG', 'JPEG', 'ICO'],
    cmp: null,
    show: function(callback, cmp) {
        this.cmp = cmp;
        var langImage = this.langImage;
        var langChooseImage = this.langChooseImage;
        var langUpload = this.langUpload;
        var langUploadingMessage = this.langUploadingMessage;
        var langUploadSuccessMsg = this.langUploadSuccessMsg;
        var langUploadFailureMsg = this.langUploadFailureMsg;

        if (!this.win) {
            this.initTemplates();

            this.store = new Ext.data.JsonStore({
                url: this.config.url,
                root: 'data',
                fields: ['name', 'url',
                {
                    name: 'size',
                    type: 'float'
                }, {
                    name: 'lastmod',
                    type: 'date',
                    dateFormat: 'timestamp'
                },{
                	name: 'height',
                    type: 'String'
                },{
                	name: 'width',
                    type: 'String'
                }],
                listeners: {
                    'load': {
                        fn: function() {
                            this.view.select(0);
                        },
                        scope: this,
                        single: true
                    }
                }
            });
            var imageStore = this.store;
//            this.store.load();

            var formatSize = function(data) {
                    if (data.size < 1024) {
                        return data.size + " bytes";
                    } else {
                        return (Math.round(((data.size * 10) / 1024)) / 10) + " KB";
                    }
                };

            var formatData = function(data) {
                    data.shortName = data.name.ellipse(15);
                    data.sizeString = formatSize(data);
                    data.dateString = new Date(data.lastmod).format("m/d/Y g:i a");
                    this.lookup[data.name] = data;
                    return data;
                };

            this.view = new Ext.DataView({
                tpl: this.thumbTemplate,
                singleSelect: true,
                overClass: 'x-view-over',
                itemSelector: 'div.thumb-wrap',
                emptyText: '<div style="padding:10px;">No images match the specified filter</div>',
                store: this.store,
                listeners: {
                    'selectionchange': {
                        fn: this.showDetails,
                        scope: this,
                        buffer: 100
                    },
                    'dblclick': {
                        fn: this.doCallback,
                        scope: this
                    },
                    'loadexception': {
                        fn: this.onLoadException,
                        scope: this
                    },
                    'beforeselect': {
                        fn: function(view) {
                            return view.store.getRange().length > 0;
                        }
                    }
                },
                prepareData: formatData.createDelegate(this)
            });
            var fileExtensions = this.fileextensions;
            var appMessage = new Ext.bridgex.ApplicationMessage();
            var cfg = {
                title: this.langImage,
                //cls: 'bg_shd4',
                minWidth: 500,
                minHeight: 385,
                modal: true,
                closeAction: 'hide',
                border: false,
                resizable: false,
                layout: 'form',
                items: [appMessage,
                {
                    xtype: 'tabpanel',
                    activeTab: 0,
                    items: [{
                        title: langChooseImage,
                        id: 'img-chooser-dlg',
                        width: 450,
                        height: 310,
                        padding: 5,
                        cls: 'bg_shd4 pad5',
                        //cls: 'bg_shd4',
                        layout: 'border',
                        items: [{
                            id: 'img-chooser-view',
                            region: 'center',
                            autoScroll: true,
                            cls: 'bor1',
                            items: this.view
                        }, {
                            id: 'img-detail-panel',
                            region: 'east',
                            split: true,
                            width: 150,
                            cls: 'bor1',
                            minWidth: 150,
                            maxWidth: 250
                        }, {
                            id: 'img-parm-panel',
                            region: 'south',
                            split: true,
                            height: 35,
                            padding: 5,
                            cls: 'bor1',
                            layout: 'hbox',
                            items: [{
                                xtype: 'label',
                                text: 'Width:'
                            }, {
                                xtype: 'spacer',
                                width: 3
                            }, {
                                xtype: 'numberfield',
                                minValue: 0,
                                id: 'x-img-width-param',
                                width: 45
                            }, {
                                xtype: 'spacer',
                                width: 7
                            }, {
                                xtype: 'label',
                                text: 'Height:'
                            }, {
                                xtype: 'spacer',
                                width: 3
                            }, {
                                xtype: 'numberfield',
                                minValue: 0,
                                width: 45,
                                id: 'x-img-height-param'
                            }]
                        }],

                        buttons: [{
                            id: 'ok-btn',
                            cls: 'padTop4',
                            text: this.langBtnOk,
                            handler: this.doCallback,
                            scope: this
                        }, {
                            text: this.langBtnCancel,
                            cls: 'padTop4',
                            handler: function() {
                                this.win.close();
                            },
                            scope: this
                        }],
                        listeners: {
                            activate: function(view) {
                                imageStore.load();
                                appMessage.hideMe();
                            }
                        }
                    }, {
                        title: 'Upload',
                        xtype: 'form',
                        cls: 'bg_shd4 uploadImagePopup padLeft10 padTop5',
                        id: 'htmlEditorImageUploadForm',
                        //width: 450,
                        //standardSubmit: true,
                        fileUpload: true,
                        //padding: 5,
                        frame: true,
                        height: 310,
                        items: [{
                            xtype: 'fileuploadfield',
                            id: 'selectImage',
                            emptyText: this.langSelectImage,
                            fieldLabel: this.langSelectImage,
                            name: 'selectImage',
                            labelStyle: 'font-weight:bold; margin-top:5px;',
                            width: 250,
                            buttonText: '...',
                            buttonCfg: {
                                iconCls: 'upload-icon'
                            },
                            listeners: {
                                fileselected: function(view, file) {
                                    var fileExtension = file.substr(file.lastIndexOf('.') + 1, file.length);
                                    if (fileExtensions.indexOf(fileExtension) > -1) {
                                        Ext.getCmp('btnSendToServer').enable();
                                    }
                                }
                            }
                        }, {
                            xtype: 'button',
                            cls: 'padTop5 padLeft5',
                            id: 'btnSendToServer',
                            disabled: true,
                            text: this.langBtnSendItToServer,
                            handler: function(view) {
                                var htmlImageUpload = Ext.getCmp('htmlEditorImageUploadForm').getForm();
                                htmlImageUpload.submit({
                                    url: 'saveImage',
                                    scope: this,
                                    success: function(form, action) {
                                        var success = {
                                            type: 'success',
                                            message: langUploadSuccessMsg,
                                            id: 'listGridSuccessId'
                                        };
                                        appMessage.showMessage(success);
                                    },
                                    failure: function(form, action) {
                                        var failure = {
                                            type: 'error',
                                            message: langUploadFailureMsg,
                                            id: 'listGridErrorId'
                                        };

                                        appMessage.showMessage(failure);
                                    },
                                    waitMsg: langUploadingMessage
                                });
                            }
                        }],
                        listeners: {
                            activate: function(view) {
                                appMessage.hideMe();
                            }
                        }
                    }]
                }],
                keys: {
                    key: 27,
                    // Esc key
                    handler: function() {
                        this.win.close();
                    },
                    scope: this
                }
            };
            Ext.apply(cfg, this.config);
            this.win = new Ext.Window(cfg);
        }

        this.reset();
        //this.win.show(el);
        this.win.show();
        this.callback = callback;
        //this.animateTarget = el;
    },
    initTemplates: function() {
        this.thumbTemplate = new Ext.XTemplate('<tpl for=".">', '<div class="thumb-wrap" id="{name}">', '<div class="thumb"><img src="{url}" title="{name}"></div>', '<span>{shortName}</span></div>', '</tpl>');
        this.thumbTemplate.compile();

/*
		'<div class="details">',
				'<tpl for=".">',
					'<img src="{url}"><div class="details-info">',
					'<b>Image Name:</b>',
					'<span>{name}</span>',
					'<b>Size:</b>',
					'<span>{sizeString}</span>',
					'<b>Last Modified:</b>',
					'<span>{dateString}</span></div>',
				'</tpl>',
			'</div>'
		*/
        this.detailsTemplate = new Ext.XTemplate('<div class="details">', '<tpl for=".">', '<img src="{url}" height="100" width="100"><div class="details-info">', '<b>Image Name:</b>', '<span>{name}</span>', '</tpl>', '</div>');
        this.detailsTemplate.compile();
    },

    showDetails: function() {
    	
        var selNode = this.view.getSelectedNodes();
        var detailEl = Ext.getCmp('img-detail-panel').body;
       
        if (selNode && selNode.length > 0) {
            selNode = selNode[0];
            Ext.getCmp('ok-btn').enable();
            var data = this.lookup[selNode.id];
                        
            Ext.getCmp('x-img-height-param').setValue(data.height);
            Ext.getCmp('x-img-width-param').setValue(data.width);
            detailEl.hide();
            this.detailsTemplate.overwrite(detailEl, data);
            detailEl.slideIn('l', {
                stopFx: true,
                duration: .2
            });
        } else {
            Ext.getCmp('ok-btn').disable();
            detailEl.update('');
        }
    },

/*filter : function(){
		var filter = Ext.getCmp('filter');
		this.view.store.filter('name', filter.getValue());
		this.view.select(0);
	},*/

/*sortImages : function(){
		var v = Ext.getCmp('sortSelect').getValue();
    	this.view.store.sort(v, v == 'name' ? 'asc' : 'desc');
    	this.view.select(0);
    },*/

    reset: function() {
        if (this.win.rendered) {
            //Ext.getCmp('filter').reset();
            this.view.getEl().dom.scrollTop = 0;
        }
        this.view.store.clearFilter();
        this.view.select(0);
    },

    doCallback: function() {
        var selNode = this.view.getSelectedNodes()[0];
        var callback = this.callback;
        var lookup = this.lookup;
        var cmp = this.cmp;
        var height = Ext.getCmp('x-img-height-param').getValue();
        var width = Ext.getCmp('x-img-width-param').getValue();
        this.win.hide(this.animateTarget, function() {
            if (selNode && callback) {
                var data = lookup[selNode.id];
                callback(data, cmp, height, width);
            }
        });
        this.win.close();
    },

    onLoadException: function(v, o) {
        this.view.getEl().update('<div style="padding:10px;">' + this.langImageLoadMsg + '</div>');
    }
};

String.prototype.ellipse = function(maxLength) {
    if (this.length > maxLength) {
        return this.substr(0, maxLength - 3) + '...';
    }
    return this;
};
