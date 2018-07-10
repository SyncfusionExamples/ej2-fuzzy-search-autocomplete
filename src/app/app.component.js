"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Fuse = require("fuse.js");
var AppComponent = (function () {
    function AppComponent() {
        var _this = this;
        this.name = 'Angular';
        this.booksData = [
            { BookName: 'Support Vector Machines Succinctly', BookID: 'BOOK1' }, { BookName: 'Scala Succinctly', BookID: 'BOOK2' },
            { BookName: 'Application Security in .NET Succinctly', BookID: 'BOOK3' },
            { BookName: 'Node.js Succinctly', BookID: 'BOOK36' },
            { BookName: 'Javascript Succinctly', BookID: 'BOOK36' }
        ];
        // maps the appropriate column to fields property
        this.fields = { value: 'BookName' };
        // set placeholder to AutoComplete input element
        this.watermark = 'e.g. Node.js Succinctly';
        //Bind the filter event
        this.onFiltering = function (e) {
            var options = {
                keys: ['BookName'],
                includeMatches: true,
                findAllMatches: true
            };
            // create object from Fuse constructor
            var fuse = new Fuse(_this.booksData, options);
            // store the search result data based on typed characters
            var result = fuse.search(e.text);
            var data = [];
            for (var i = 0; i < result.length; i++) {
                data.push(result[i].item);
            }
            // pass the filter data source to updateData method.
            e.updateData(data, null);
            var popupElement = document.getElementById('books_popup');
            var lists = popupElement.querySelectorAll('.e-list-item');
            // For highlight the typed characters, pass the result data and list items to highlightSearch method.
            _this.highlightSearch(lists, result);
        };
    }
    AppComponent.prototype.highlightSearch = function (listItems, result) {
        if (result.length > 0) {
            for (var i = 0; i < listItems.length; i++) {
                var innerHTML = listItems[i].innerHTML;
                for (var j = result[i].matches[0].indices.length - 1; j >= 0; j--) {
                    var indexes = result[i].matches[0].indices[j];
                    innerHTML = innerHTML.substring(0, indexes[0]) + '<span class="e-highlight">' +
                        innerHTML.substring(indexes[0], (indexes[1] + 1)) + '</span>' + innerHTML.substring(indexes[1] + 1);
                    listItems[i].innerHTML = innerHTML;
                }
            }
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        // specifies the template string for the autocomplete component.
        template: "<div style=\"width: 300px;margin: 0px auto;width: 300px;padding-top: 40px;\">\n    <ejs-autocomplete id='books' [dataSource]='booksData' [fields]='fields' (filtering)='onFiltering($event)' [placeholder]='watermark'></ejs-autocomplete></div>",
        // include the material theme in autocomplete.
        styleUrls: ['../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css'],
        encapsulation: core_1.ViewEncapsulation.None
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map