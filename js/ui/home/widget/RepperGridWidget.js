define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dgrid/OnDemandGrid",
    "dojo/text!./templates/RepperGridWidget.html"
], function (
    declare,
    lang,
    _WidgetBase,
    _TemplatedMixin,
    OnDemandGrid,
    template
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
        
        startup: function () {
            this.gridWidget.startup();
        },

        buildGrid: function () {
            var columns = {
                reps: {
                    label: 'Reps',
                    field: "reps",
                },
                weight: {
                    label: 'Weight',
                    field: "weight",
                },
                units: {
                    label: '',
                    field: "units",
                }
            };
            return new (declare([OnDemandGrid]))({
                store: this.store,
                columns: columns,
                queryOptions: { sort: [{ attribute: 'weight', descending: true }] },
                loadingMessage: 'Loading...',
                noDataMessage: 'No Releases Available'
            }, this.gridNode);
        }
    });
});