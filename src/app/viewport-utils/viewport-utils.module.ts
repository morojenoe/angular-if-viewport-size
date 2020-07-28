import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IfViewportSizeDirective } from './if-viewport-size/if-viewport-size.directive';
import { ViewportService } from './viewport/viewport.service';

@NgModule({
  declarations: [IfViewportSizeDirective],
  exports: [IfViewportSizeDirective],
  imports: [CommonModule],
  providers: [ViewportService]
})
export class ViewportUtilsModule { }
