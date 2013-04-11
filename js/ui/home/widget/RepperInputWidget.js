define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/form/Button",
    "dijit/form/NumberTextBox",
    "dijit/form/Select",
    "dojo/store/Memory",
    "dojo/dom-attr",
    "dojo/text!./templates/RepperInputWidget.html",
    "dojo/i18n!./nls/RepperInputWidget"
], function (
    declare,
    lang,
    _WidgetBase,
    _TemplatedMixin,
    Button,
    NumberTextBox,
    Select,
    Memory,
    domAttr,
    template,
    nls
) {
    return declare([_WidgetBase, _TemplatedMixin], {
        store: null,
        templateString: template,
        inputWeightTextBox: null,
        inputUnitsSelect: null,
        inputRepsTextBox: null,
        inputCalcButtonWidget: null,

        constructor: function (params) {
            this.store = params.store;
        },

        postCreate: function () {
            this.inherited(arguments);
            this.buildInputForm();
            this.inputCalcButtonWidget = this.buildCalcButton();
        },
        
        startup: function () {
            this.inputCalcButtonWidget.startup();
        },
        
        buildInputForm: function () {
        	this.inputWeightTextBox = new NumberTextBox({
                'class': domAttr.get(this.weightInputNode, 'class'), // allow the class to be set in the template
                value: 200,
                required: "true"
            }, this.weightInputNode);
            
            this.inputUnitsSelect = new Select({
	            name: "units",
	            options: [
	                { label: "LB", value: "LB (pounds)"},
	                { label: "KG", value: "KG (kilos)" },
	                { label: "ST", value: "ST (stones)" }
	            ]
            }, this.unitsInputNode);
            
        	this.inputRepsTextBox = new NumberTextBox({
                'class': domAttr.get(this.repsInputNode, 'class'), // allow the class to be set in the template
                value: 10,
                required: "true"
            }, this.repsInputNode);
        },
        
        buildCalcButton: function () {
            var onClick = function () {
            	var repList = [];
            	var weightValue = Number(this.inputWeightTextBox.value);
        		var orm = 36 * this.inputWeightTextBox / (37 - this.inputRepsTextBox);
        		for (var i=0;i<10;i++) {
	        		repList[i] = {
	        			weight: Math.round(orm * (37 - (i+1)) / 36),
	        			units: this.inputUnitsSelect.value
	        		};
	        	}
	        	this.store = new Memory({data:repList});
            };
            
            return new Button({
                'class': domAttr.get(this.inputCalcButtonNode, 'class'), // allow the class to be set in the template
                label: nls.inputCalcButtonLabel,
                onClick: lang.hitch(this, onClick)
            }, this.inputCalcButtonNode);
        }
    });
});