import { Directive, ViewContainerRef, TemplateRef, OnDestroy, Input } from '@angular/core';
import { ViewportService } from '../viewport/viewport.service';
import { BreakpointType } from '../breakpoints';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[ifViewportSize]'
})
export class IfViewportSizeDirective implements OnDestroy {
  private currentBreakpoint: BreakpointType = null;
  private subscription: Subscription;
  private conditionBreakpoint: BreakpointType;
  private hasAttachedView = false;

  constructor(private viewContainer: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private viewportService: ViewportService) {
    this.subscription = this.viewportService.changes().subscribe(
      breakpoint => {
        this.currentBreakpoint = breakpoint;
        this.updateView();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  @Input()
  set ifViewportSize(value: BreakpointType) {
    this.conditionBreakpoint = value;
    this.updateView();
  }

  private updateView() {
    if (this.needToShow && !this.hasAttachedView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasAttachedView = true;
    } else if (!this.needToShow && this.hasAttachedView) {
      this.viewContainer.clear();
      this.hasAttachedView = false;
    }
  }

  private get needToShow() {
    return this.conditionBreakpoint === this.currentBreakpoint;    
  }
}
