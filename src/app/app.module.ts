import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AutoCompleteModule } from '@syncfusion/ej2-ng-dropdowns';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, AutoCompleteModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
