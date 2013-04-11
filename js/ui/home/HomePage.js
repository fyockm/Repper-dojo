define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/query",
    "./widget/RepperInputWidget",
    "./widget/RepperGridWidget",
    "dojo/text!./templates/HomePage.html",
    "dojo/text!./css/HomePage.css"
], function (
    declare,
    _WidgetBase,
    _TemplatedMixin,
    query,
    RepperInputWidget,
    RepperGridWidget,
    template,
    css
) {
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,
        repperInputWidget: null,
        repperGridWidget: null,
        store: null,

        postCreate: function () {
            this.inherited(arguments);
			
			this.repperInputWidget = new RepperInputWidget({store: this.store}, this.inputNode);
			this.repperGridWidget = new RepperGridWidget({store: this.store}, this.gridNode);
            
            // setting style
            var styleElement = window.document.createElement('style');
            styleElement.setAttribute("type", "text/css");
            query('head')[0].appendChild(styleElement);

            if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText = css; // IE
            } else {
                styleElement.innerHTML = css; // the others
            }
        }
    });
});