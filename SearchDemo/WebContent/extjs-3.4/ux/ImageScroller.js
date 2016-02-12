Ext.ns('Ext.ux');
Ext.ux.ImageScroll = Ext.extend(Ext.BoxComponent, {
	containerClass: "div.x-ux-is-container",
	sliceClass: 'div.x-ux-is-slice',
	navNextClass: 'span.x-ux-is-nav-next',
	navPrevClass: 'span.x-ux-is-nav-prev',
	emptyText: "",
	deferEmptyText: true,
	trackOver: false,
	blockRefresh: false,
	visibleIndex: 0, // the index of the current expanded slice
	sliceH: 45,  // the default slice's height	
	current: 0,  // controls the current slider position
	totalSlices: 0,	  // total number of slices
	visibleSlices: 3,
	nextIndex: 0,
	prevIndex: 0,
	last: false,
	initComponent: function(){
		Ext.ux.ImageScroll.superclass.initComponent.call(this);
		if(Ext.isString(this.tpl) || Ext.isArray(this.tpl)){
			this.tpl = new Ext.XTemplate(this.tpl);
		}
		
		this.addEvents(
			"click",
			"mouseover",
			"mouseout"
		);
		
		this.store = Ext.StoreMgr.lookup(this.store);
		this.all = new Ext.CompositeElementLite();
		this.selected = new Ext.CompositeElementLite();
	},
	getTemplateTarget: function(){
		return this.el;
	},
	afterRender : function(){
		Ext.DataView.superclass.afterRender.call(this);
		var el = this.getTemplateTarget();
		var minSliceH = this.sliceH;
													
		/*this.mon(this.getTemplateTarget(), {
			"click": this.onClick,
			scope: this
		});
		*/
		
		if(this.data){
			this.tpl.overwrite(el, data);
		}
		
		/* Get Main Container */
		this.container = el.select(this.containerClass).first();
		if (typeof this.container == 'undefined' || this.container == null) return;
		
		/* Get all Slices */
		this.slices = el.select(this.sliceClass);
		/* Set total Number of Slices */
		this.totalSlices = this.slices.getCount();
		
		/* Get Navigation Buttons */
		this.navNext = el.select(this.navNextClass).first();
		if (typeof this.navNext == 'undefined' || this.navNext == null) return;
		
		/* Get Navigation Buttons */
		this.navPrev = el.select(this.navPrevClass).first();
		if (typeof this.navPrev == 'undefined' || this.navPrev == null) return;
		
		/*	Don't display previous button	*/
		this.navPrev.fadeOut();
		
		/* Don't display next button if totalSlices < visibleSlices */
		if (this.totalSlices <= this.visibleSlices){
			this.navNext.fadeOut();
		}
		
		/*	Set Default position of Container */
		this.setContainer();
		
		/*	Set Default position of Slices */
		this.setToDefaultPos();			
		
		this.navNext.on('click', this.onNavNextClick, this);
		this.navPrev.on('click', this.onNavPrevClick, this);				
	},
	setContainer: function(){
		var container = this.container;
		var visibleSlices = this.visibleSlices;
		var minSliceH = this.sliceH;
		var onMouseWheelFn = this.onMouseWheel;
		
		/*	style="top: 50px; width: 36px; height: 120px;" */
		container.animate({
			//top: {to: 50, from: container.getHeight(), unit: 'px'},
			width: {to: minSliceH, from: container.getWidth(), unit: 'px'},
			height: {to: minSliceH * visibleSlices, from: container.getHeight(), unit:'px'  }
		});
		
		container.on('mousewheel', onMouseWheelFn, this);
	},
	setToDefaultPos: function(){
		var slices = this.slices;
		var minSliceH = this.sliceH;
		var onClickFn = this.onClick;
		var onMouseOverFn = this.onItemMouseOver;
		var onMouseOutFn = this.onItemMouseOut;
		var me = this;
		
		slices.each(function(el, c, index){					
			el.animate({
				height: { to: minSliceH, from: el.getHeight(), unit: 'px'},
				top: {by: index * minSliceH, unit: 'px'}
			});
			el.on('click', Ext.createDelegate(onClickFn, me, index, true), me);
			el.on('mouseover', Ext.createDelegate(onMouseOverFn, me, index, true), me);
			el.on('mouseout', Ext.createDelegate(onMouseOutFn, me, index, true), me);
		});
	},
	onItemMouseOver: function(el, htmlEl, opt, index){
		var me = this;
		var item = el.getTarget(me.sliceClass, me.getTemplateTarget(), true);				
		me.fireEvent("mouseover", me, index, item, htmlEl);
	},
	onItemMouseOut: function(el, htmlEl, opt, index){
		var me = this;
		var item = el.getTarget(me.sliceClass, me.getTemplateTarget(), true);				
		me.fireEvent("mouseout", me, index, item, htmlEl);
	},
	onNavNextClick: function(e){	
		var slices = this.slices;
		var minSliceH = this.sliceH;
		var totalSlices = this.totalSlices;
		var visibleSlices = this.visibleSlices;
		var nextIndex = this.nextIndex;
		var prevIndex = this.prevIndex;			
		
		slices.each(function(el, c, index){					
			var topPx = el.getStyle('top');
			var maxPx = 2;
			var extTop = Ext.util.Format.substr(topPx, 0, topPx.length-maxPx);
			var newTop = parseInt(extTop) - parseInt(minSliceH);					
			el.animate({						
				top: {to: newTop, unit: 'px'}
			});						
		});
		
		this.prevPrevIndex = prevIndex;
		prevIndex++;				
		if ((prevIndex+visibleSlices) == totalSlices) this.navNext.fadeOut();
		if (prevIndex > 0 && this.prevPrevIndex == 0) this.navPrev.fadeIn();
		if (nextIndex > 0) nextIndex--;
		
		this.nextIndex = nextIndex;
		this.prevIndex = prevIndex;			
	},
	onNavPrevClick: function(e){
		var slices = this.slices;
		var minSliceH = this.sliceH;
		var totalSlices = this.totalSlices;
		var visibleSlices = this.visibleSlices;
		var nextIndex = this.nextIndex;
		var prevIndex = this.prevIndex;						
		
		slices.each(function(el, c, index){					
			var topPx = el.getStyle('top');
			var maxPx = 2;
			var extTop = Ext.util.Format.substr(topPx, 0, topPx.length-maxPx);
			var newTop = parseInt(extTop) + parseInt(minSliceH);	
			el.animate({						
				top: {to: newTop, unit: 'px'}
			});						
		});			
		
		this.prevNextIndex = nextIndex;
		nextIndex++;
		if ((nextIndex+visibleSlices) == totalSlices) this.navPrev.fadeOut();
		if (nextIndex > 0 && this.prevNextIndex == 0) this.navNext.fadeIn();
		if (prevIndex > 0) prevIndex--;
		
		this.nextIndex = nextIndex;
		this.prevIndex = prevIndex;				
	},
	onClick: function(el, htmlEl, opt, index){
		var me = this;
		var item = el.getTarget(me.sliceClass, me.getTemplateTarget());	
		me.fireEvent("click", me, index, item, htmlEl);
	},
	onMouseWheel: function(el){
		var me = this;
		var NEXT_DELTA = -1;
		var PREV_DELTA = 1;
		el.preventDefault();
		var item = el.getTarget(me.sliceClass, me.getTemplateTarget());					
		if (el.getWheelDelta() == NEXT_DELTA && ((this.prevIndex+this.visibleSlices) < parseInt(this.totalSlices)))
		{
			this.onNavNextClick(this);
		}				
		if (el.getWheelDelta() == PREV_DELTA && ((this.nextIndex+this.visibleSlices) < parseInt(this.totalSlices)))
		{
			this.onNavPrevClick(this);
		}				
	}	
});
Ext.reg('imagescroll', Ext.ux.ImageScroll);