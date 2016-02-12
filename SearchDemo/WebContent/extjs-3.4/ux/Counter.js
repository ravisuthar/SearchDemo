// create namespace for plugins
Ext.namespace('Ext.ux.plugins');
/*
 * How  to use?
 * xtype: 'textarea',
 * maxLength: 20,
 * plugins: new Ext.ux.plugins.Counter()
 */
Ext.ux.plugins.Counter = function (config) {
    Ext.apply(this, config);
};

Ext.extend(Ext.ux.plugins.Counter, Ext.util.Observable, {
    init: function (field) {
        field.on({
            scope: field,
            keyup: this.onKeyUp,
            focus: this.onFocus
        });
        Ext.apply(field, {
            onRender: field.onRender.createSequence(function () {
                this.el.removeClass(['x-form-text','x-form-field','x-form-focus']);
                this.el.setHeight('inherit');
                this.el.setStyle('border','none');
                this.wrap = this.el.wrap({ 
                    tag: 'div', 
                    id: this.id + '-wrapper', 
                    cls: 'x-form-text x-form-field x-form-focus'
                 },true);
				this.enableKeyEvents = true;
            }),

            afterRender: field.afterRender.createSequence(function () {
               this.counter = Ext.DomHelper.append(Ext.get(this.wrap).id,{
                    tag: 'span',
                    style: 'color:#C0C0C0;padding-left:5px;',
                    html: this.maxLength + '/' + this.maxLength
                });
            }),
            onResize: field.onResize.createSequence(function(adjWidth, adjHeight, rawWidth, rawHeight){
                var counterWidth = Ext.get(this.counter).getWidth();
                this.el.setSize(adjWidth-counterWidth,adjHeight);
            })
        });
    },
     onKeyUp: function(textField,eventObj){
        Ext.get(this.counter).update(textField.getValue().length + '/' + textField.maxLength);
     },
     onFocus:function(textField){
      Ext.get(this.counter).update(textField.getValue().length + '/' + textField.maxLength);
     }
});