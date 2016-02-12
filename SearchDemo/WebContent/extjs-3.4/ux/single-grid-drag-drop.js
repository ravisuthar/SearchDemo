/*global Ext */

/*
 *	Ext.ux.DragDropGridPanels.js
 *
 *	PURPOSE:
 *	Reusable component for drag / drop grid panels
 *
 *	AUTHOR:
 *	Tyson Cadenhead /  tysonlloydcadenheadDotCom / tysoncadenheadAtGmailDotCom
 *
 *  @param rightGrid (Required) The grid component for the right side
 *  @param leftGrid (Required) The grid component for the left side
 */

Ext.ux.DragDropGridPanels = Ext.extend(Ext.Panel, {
	layout: 'hbox',
	initComponent: function () {
		var component = this,  rightGrid = this.rightGrid, RightGridCmp;
		
        Ext.ux.DragDropGridPanels.superclass.initComponent.call(this);
	
		// Right Grid
		if (rightGrid) {
						
			RightGridCmp = Ext.extend(Ext.grid.EditorGridPanel, {
				height: component.height,
				width: component.width,
				enableDragDrop: true,
				ddGroup: 'left-' + component.id + '-dd-group',
				sm: new Ext.grid.RowSelectionModel({}),
				listeners: {
					afterrender: function (g) {
																	
						var DropTarget, LeftDropTarget, RightDropTarget;
						
						DropTarget = new Ext.ux.dd.GridReorderDropTarget(g, {
							copy: false
						});
						Ext.dd.ScrollManager.register(g.getView().getEditorParent());
					
					}
				}
			});
			component.add(new RightGridCmp(rightGrid));
		}
		else {
			throw ('Missing the rightGrid param in your Ext.DragDropGridPanels');
		}
		
	}
});