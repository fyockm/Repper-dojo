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
    "dojo/text!repper/widget/templates/RepperInputWidget.html",
    "dojo/i18n!repper/widget/nls/RepperGridWidget"
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
        
        buildInputForm: function () {
        	this.inputWeightTextBox = new NumberTextBox({
                'class': domAttr.get(this.weightInputNode, 'class'), // allow the class to be set in the template
                constraints: { min:10, max:1000, places:0},
                required: "true",
                placeHolder: nls.weightLabel
            }, this.weightInputNode);
            
            this.inputUnitsSelect = new Select({
	            name: "units",
	            options: [
	                { label: "lb (pounds)", value: "lb"},
	                { label: "kg (kilos)", value: "kg" },
	                { label: "st (stones)", value: "st" }
	            ]
            }, this.unitsInputNode);
            
        	this.inputRepsTextBox = new NumberTextBox({
                'class': domAttr.get(this.repsInputNode, 'class'), // allow the class to be set in the template
                constraints: { min:1, max:15, places:0},
                required: "true",
                placeHolder: nls.repsLabel
            }, this.repsInputNode);
        },
        
        buildCalcButton: function () {
            var onClick = function () {
                if (!this.inputRepsTextBox.isValid() || !this.inputWeightTextBox.isValid) { 
                    alert('Form contains invalid data.  Please correct first');
                    return false;
                }
                var orm = 36 * this.inputWeightTextBox / (37 - this.inputRepsTextBox);
                for (var i=0;i<10;i++) {
                    this.store.notify({
                        id: i,
                        lift: {
                            weight: Math.round(orm * (37 - (i+1)) / 36),
                            units: this.inputUnitsSelect.value,
                            reps: i+1,
                            toString: function  () {
                                return this.weight + " " + this.units + " x " + this.reps;
                            }
                        }
                    },i); 
                }
                return true;
            };
            
            return new Button({
                'class': domAttr.get(this.inputCalcButtonNode, 'class'), // allow the class to be set in the template
                label: nls.inputCalcButtonLabel,
                onClick: lang.hitch(this, onClick)
            }, this.inputCalcButtonNode);
        }
    });
});