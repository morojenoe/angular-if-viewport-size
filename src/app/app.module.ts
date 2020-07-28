import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TestComponent } from './test.component';
import { ViewportUtilsModule } from './viewport-utils/viewport-utils.module';
import { BREAKPOINTS, BreakpointsConfig } from './viewport-utils/breakpoints';

const customBreakpoints: BreakpointsConfig = {
  medium: 800,
  large: 1000
};

@NgModule({
  imports:      [ BrowserModule, FormsModule, ViewportUtilsModule ],
  declarations: [ AppComponent, HelloComponent, TestComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
    { provide: BREAKPOINTS, useValue: customBreakpoints }
  ]
})
export class AppModule { }
