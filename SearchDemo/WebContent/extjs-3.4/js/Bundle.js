Ext.ns('Ext.i18n');

/**
 * @class Ext.18n.Bundle
 * @constructor
 * @version 0.2.1
 * @param config.bundle: {String} Bundle Name.
 * @param config.path: {String} Bundle Folder URI. Optional.
 * @param config.lang: {String} Language in the form xx-YY where:
 * 		xx: Language code (2 characters lowercase) YY: Country code (2 characters upercase). 
 * Optional. Default to browser's language. If it cannot be determined default to en-US.
 * @param config.method: {String} request method. POST | GET. Optional. Default to POST
 * 	
 * @author Maximiliano Fierro (elmasse)
 */
Ext.i18n.Bundle = function(config){
	
	this.bundle = config.bundle;
	this.path = config.path;
	this.language = this.formatLanguageCode(config.lang || this.guessLanguage()); 
	this.method = config.method || 'GET';

	var url = this.buildURL(this.language);
	
    Ext.i18n.Bundle.superclass.constructor.call(this, {
    	autoLoad: false,
    	proxy: this.createProxy(url),
        reader: new Ext.i18n.PropertyReader()
    });

	this.on('exception', this.loadParent);
};

Ext.extend(Ext.i18n.Bundle, Ext.data.Store,{ 
	defaultLanguage: 'en-US',
	loadFlag: false,
	resourceExt: '.txt',
	bundle: '',
	path: null,
	
	/**
	 * @private
	 */
	guessLanguage: function(){
		return (navigator.language || navigator.browserLanguage
				|| navigator.userLanguage || this.defaultLanguage);
	},
	
	/**
	 * @method: getMsg
	 * Returns the content associated with the bundle key or {bundle key}.undefined if it is not specified.
	 * @param: key {String} Bundle key.
	 * @return: {String} The bundle key content. 
	 */
	getMsg: function(key){
		//console.log(Ext.util.Format.htmlDecode(this.getById(key).data));
		return this.getById(key)? Ext.util.Format.htmlDecode(this.getById(key).data) : key + '.undefined';
		//return this.getById(key)? ''+this.getById(key).data : key + '.undefined';
	},
	
	/**
	 * @method: onReady
	 * The fn will be called when the Bundle file is loaded.
	 * @param: fn {Function}
	 */
	onReady: function(fn){
		var body = Ext.getBody();
		body.mask('Loading...');
		
		this.readyFn = fn;
		this.load({
			callback: function(v, records, opts){
				body.unmask();
				this.readyFn(v, records, opts);
			}
		});
		//this.on('load', this.fn);
	},
	
	/**
	 * @private
	 */
	buildURL: function(language){
		var url = '';
		if (this.path) url+= this.path + '/';
		url+=this.bundle;
		if (language) url+= '_'+language;
		url+=this.resourceExt;
		return url;
	},
	
	/**
	 * @private
	 */
	loadParent: function(){
		var url = this.buildURL();
		this.proxy = this.createProxy(url);
		this.un('exception', this.loadParent);
		this.load();			
	},
	
	/**
	 * @private
	 */
	createProxy: function(url){
		return new Ext.data.HttpProxy({
    		url: url, 
    		method: this.method
    	});
	},
	
	/**
	 * @private
	 */
	formatLanguageCode: function(lang){
		var langCodes = lang.split('-');
		langCodes[0] = (langCodes[0]) ? langCodes[0].toLowerCase() : '';
		langCodes[1] = (langCodes[1]) ? langCodes[1].toUpperCase() : '';
		return langCodes.join('-');
	}

});

