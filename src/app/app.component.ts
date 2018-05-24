import { Component,ViewEncapsulation } from '@angular/core';
import * as Fuse from 'fuse.js';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';

@Component({
  selector: 'my-app',
  template: `<div style="width: 300px;margin: 0px auto;width: 300px;padding-top: 40px;">
  <ejs-autocomplete id='books' [dataSource]='booksData'[fields]='fields' (filtering)='onFiltering($event)' [placeholder]='watermark'></ejs-autocomplete></div>`,
  // include the material theme to AutoComplete
  styleUrls: ['../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent  { name = 'Angular'; 
//public sportsData: string[] = ['Badminton', 'Basketball', 'Cricket', 'Football', 'Golf', 'Gymnastics', 'Hockey', 'Rugby', 'Snooker', 'Tennis'];
    public booksData: { [key: string]: Object; }[] = [
        { BookName: 'Support Vector Machines Succinctly', BookID: 'BOOK1' }, { BookName: 'Scala Succinctly', BookID: 'BOOK2' },
        { BookName: 'Application Security in .NET Succinctly', BookID: 'BOOK3' },
        { BookName: 'Node.js Succinctly', BookID: 'BOOK36' },
                { BookName: 'Javascript Succinctly', BookID: 'BOOK36' }
    ];
    // maps the appropriate column to fields property
    public fields: Object = { value: 'BookName' };
    // set placeholder to AutoComplete input element
    public watermark: string = 'e.g. Node.js Succinctly';
    //Bind the filter event
    public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
        let options: Object = {
            keys: ['BookName'],
            includeMatches: true,
            findAllMatches: true
        };
        // create object from Fuse constructor
        let fuse: Fuse = new Fuse(this.booksData, options);
        // store the search result data based on typed characters
        let result: any = fuse.search(e.text); 
        let data: { [key: string]: Object; }[] = [];
        for (let i: number = 0; i < result.length; i++) {
            data.push(result[i].item as any);
        }
        // pass the filter data source to updateData method.
        e.updateData(data, null);
        let popupElement: HTMLElement = document.getElementById('books_popup');
        let lists: Element[] = <NodeListOf<Element> & Element[]>popupElement.querySelectorAll('.e-list-item');
        // For highlight the typed characters, pass the result data and list items to highlightSearch method.
        this.highlightSearch(lists, result);
    }

    public highlightSearch(listItems: Element[], result: any): void {
        if (result.length > 0) {
            for (let i: number = 0; i < listItems.length; i++) {
                let innerHTML: string = listItems[i].innerHTML;
                for (let j: number = result[i].matches[0].indices.length - 1; j >= 0; j--) {
                    let indexes: number[] = <number[]>result[i].matches[0].indices[j];
                    innerHTML = innerHTML.substring(0, indexes[0]) + '<span class="e-highlight">' +
                        innerHTML.substring(indexes[0], (indexes[1] + 1)) + '</span>' + innerHTML.substring(indexes[1] + 1);
                    listItems[i].innerHTML = innerHTML;
                }
            }
        }
    }
}
