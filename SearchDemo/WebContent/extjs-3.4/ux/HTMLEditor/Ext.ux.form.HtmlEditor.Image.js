/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.Image
 * @extends Ext.util.Observable
 * <p>A plugin that creates an image button in the HtmlEditor toolbar for inserting an image. The method to select an image must be defined by overriding the selectImage method. Supports resizing of the image after insertion.</p>
 * <p>The selectImage implementation must call insertImage after the user has selected an image, passing it a simple image object like the one below.</p>
 * <pre>
 *      var img = {
 *         Width: 100,
 *         Height: 100,
 *         ID: 123,
 *         Title: 'My Image'
 *      };
 * </pre>
 */
Ext.ux.form.HtmlEditor.Image = Ext.extend(Ext.util.Observable, {
    urlSizeVars: ['width', 'height'],
    init: function(cmp) {
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
        this.cmp.on('initialize', this.onInit, this, {
            delay: 100,
            single: true
        });
    },
    onEditorMouseUp: function(e) {
        Ext.get(e.getTarget()).select('img').each(function(el) {
            var w = el.getAttribute('width'),
                h = el.getAttribute('height'),
                src = el.getAttribute('src') + ' ';
            src = src.replace(new RegExp(this.urlSizeVars[0] + '=[0-9]{1,5}([&| ])'), this.urlSizeVars[0] + '=' + w + '$1');
            src = src.replace(new RegExp(this.urlSizeVars[1] + '=[0-9]{1,5}([&| ])'), this.urlSizeVars[1] + '=' + h + '$1');
            el.set({
                src: src.replace(/\s+$/, "")
            });
        }, this);

    },
    onInit: function() {
        Ext.EventManager.on(this.cmp.getDoc(), {
            'mouseup': this.onEditorMouseUp,
            buffer: 100,
            scope: this
        });
    },
    onRender: function() {
        this.cmp.getToolbar().addButton([{
            iconCls: 'x-edit-image',
            handler: this.selectImage,
            scope: this,
            tooltip: Ext.BUNDLE.getMsg('ImageChooser.title'),
            overflowText: Ext.BUNDLE.getMsg('ImageChooser.title')
        }]);
    },
    selectImage: function() {
       // if (this.imageChooser == null) {
            var imageChooser = new ImageChooser({
                url: 'getImageList',
                width: 500,
                height: 370
            });
//        }
        imageChooser.show(this.insertImage, this.cmp);
    },
    insertImage: function(img, cmp, height, width) {
        //this.cmp.insertAtCursor('<img src="'+this.basePath+'?'+this.urlSizeVars[0]+'='+img.Width+'&'+this.urlSizeVars[1]+'='+img.Height+'&id='+img.ID+'" title="'+img.Name+'" alt="'+img.Name+'">');
//        cmp.focus();
        cmp.insertAtCursor('<img src="' + img.url + '" width="' + width + '" height="' + height + '">');
        
    }
});