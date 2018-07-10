import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AutoCompleteComponent } from '@syncfusion/ej2-ng-dropdowns';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, AutoCompleteComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
