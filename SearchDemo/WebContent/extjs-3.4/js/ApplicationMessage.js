Ext.ns("Ext.bridgex");

Ext.bridgex.ApplicationMessage = Ext.extend(Ext.Panel, {
	constructor: function() {
		Ext.apply(this, {
			//cls: 'bg_shd4',
			hidden:true,
			layout: 'fit'
		});
		Ext.bridgex.ApplicationMessage.superclass.constructor.call(this);
	},
	showMessage: function(data){ 
				
		var tpl = new Ext.XTemplate(
					'<div class="{type}">',
					'<div style="float:right; margin-right:10px; *padding-top:10px;">',
					'<a style="float:left;" href="#">',
					'<img src="../images/icon_error1.png" id="{id}"/>',
					'</a>',
					'</div>',
					'<div class="message">',
					'{message}',
					'</div>',
					'</div>'
		);
		
		if (this.body != null) 
		{
			tpl.overwrite(this.body, data);
			
			var me = this;
			Ext.get(data.id).on('click',function(e){	
				this.setVisible(false);
				me.hideMe();
			});
			
			if (me.isVisible() == false){
				me.showMe();
			}
			
	        this.body.highlight('#c3daf9', {block:true});
		}
	},
	hideMe: function(){
		this.setVisible(false);
	},
	showMe: function(){
		this.setVisible(true);
	}
});