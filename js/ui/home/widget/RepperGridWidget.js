define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/store/Memory",
    "dijit/form/TextBox",
    "dgrid/OnDemandGrid",
    "dojo/text!repper/widget/templates/RepperGridWidget.html",
    "dojo/i18n!repper/widget/nls/RepperGridWidget"
], function (
    declare,
    lang,
    _WidgetBase,
    _TemplatedMixin,
    Memory,
    TextBox,
    OnDemandGrid,
    template,
    nls
) {
    return declare([_WidgetBase, _TemplatedMixin], {
        store: null,
        templateString: template,
        gridWidget: null,
        
        constructor: function (params) {
            this.store = params.store;
        },

        postCreate: function () {
            this.inherited(arguments);
            this.gridWidget = this.buildGrid();
        },

        buildGrid: function () {
            var columns = {
                lift: {
                    label: nls.gridColumnLabel,
                    field: 'lift',
                }
            };
            return new (declare([OnDemandGrid]))({
                store: this.store,
                columns: columns,
                loadingMessage: nls.gridLoadingState,
                noDataMessage: nls.gridNoData
            }, this.gridWidgetNode);
        }
    });
});