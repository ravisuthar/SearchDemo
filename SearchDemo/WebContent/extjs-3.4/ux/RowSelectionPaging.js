/**
 * Ext.ux.grid.RowSelectionPaging plugin for Ext.grid.GridPanel
 * A grid plugin that preserves row selections across paging / filtering of the store.
 *
 * @author  Joeri Sebrechts
 * @date    October 21st, 2009
 *
 * @class Ext.ux.grid.RowSelectionPaging
 * @extends Ext.util.Observable
 */
Ext.ns('Ext.ux.grid'); 
Ext.ux.grid.RowSelectionPaging = function(config) {
    Ext.apply(this, config);
};
Ext.extend(Ext.ux.grid.RowSelectionPaging, Ext.util.Observable, {
    init: function(grid) {
       this.grid = grid;
       this.selections = []; // array of selected records
       this.selected = {}; // hash mapping record id to selected state
       grid.on('render', function() {
         // attach an interceptor for the selModel's onRefresh handler
         this.grid.view.un('refresh', this.grid.selModel.onRefresh, this.grid.selModel);
         this.grid.view.on('refresh', this.onViewRefresh, this );
         // add a handler to detect when the user changes the selection
         this.grid.selModel.on('rowselect', this.onRowSelect, this );
         this.grid.selModel.on('rowdeselect', this.onRowDeselect, this);
         // patch selModel to detect selection cleared events
         var scope = this;
         this.selModelClearSelections = this.grid.selModel.clearSelections;
         this.grid.selModel.clearSelections = function(fast) {
            scope.selModelClearSelections.call(this, fast);
            scope.onSelectionClear();
         };
         // and replace the default behavior of the "check all"
         if (!this.originalSelectAll && (this.grid.selModel.id == 'checker')) {
            this.grid.selModel.onHdMouseDown = function(e, t) {
               if(t.className == 'x-grid3-hd-checker'){
                   e.stopEvent();
                   var hd = Ext.fly(t.parentNode);
                   var isChecked = hd.hasClass('x-grid3-hd-checker-on');
                   if(isChecked){
                       hd.removeClass('x-grid3-hd-checker-on');
                       scope.clearSelections();
                   }else{
                       hd.addClass('x-grid3-hd-checker-on');
                       scope.selectAll();
                   }
               }
            }
         }
       }, this);
    }, // end init
    
    // private
    onViewRefresh: function() {
       this.ignoreSelectionChanges = true;
       // explicitly refresh the selection model
       this.grid.selModel.onRefresh();
       // selection changed from view updates, restore full selection
       var ds = this.grid.getStore();
       var newSel = [];
       for (var i = ds.getCount() - 1; i >= 0; i--) {
          if (this.selected[ds.getAt(i).id]) {
             newSel.push(i);
          }
       }
       this.grid.selModel.selectRows(newSel, false);
       this.ignoreSelectionChanges = false;
    }, // end onViewRefresh
    
    // private
    onSelectionClear: function() {
       if (! this.ignoreSelectionChanges) {
          // selection cleared by user
          // also called internally when the selection replaces the old selection
          this.selections = [];
          this.selected = {};
       }
    }, // end onSelectionClear
    
    // private
    onRowSelect: function(sm, i, rec) {
       if (! this.ignoreSelectionChanges) {
          if (!this.selected[rec.id]) 
          {
             this.selections.push(rec);
             this.selected[rec.id] = true;
          }
       }
    }, // end onRowSelect
    
    // private
    onRowDeselect: function(sm, i, rec) {
       if (!this.ignoreSelectionChanges) {
          if (this.selected[rec.id]) {
             for (var i = this.selections.length - 1; i >= 0; i--) {
                if (this.selections[i].id == rec.id) {
                   this.selections.splice(i, 1);
                   this.selected[rec.id] = false;
                   break;
                }
             }
          }
       }
    }, // end onRowDeselect
    
    /**
     * Clears selections across all pages
     */
    clearSelections: function() {
       this.selections = [];
       this.selected = {};
       this.onViewRefresh();
    }, // end clearSelections
    
    /**
     * Returns the selected records for all pages
     * @return {Array} Array of selected records
     */
    getSelections: function() {
       return [].concat(this.selections);
    }, // end getSelections
    
    /**
     * Selects all the rows in the grid, including those on other pages
     * Be very careful using this on very large datasets
     */
    selectAll: function() {
       var ds = this.grid.getStore();
       ds.suspendEvents();
       ds.load({ 
          params: {start: 0, limit: ds.getTotalCount() },
          callback: function() {
             this.selections = ds.data.items.slice(0);
             this.selected = {};
             for (var i = this.selections.length - 1; i >= 0; i--) {
                this.selected[this.selections[i].id] = true;
             };
             ds.resumeEvents();
             this.onViewRefresh();
          },
          scope: this
       });
    }
});

