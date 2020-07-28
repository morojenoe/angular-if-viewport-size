import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { map, auditTime, startWith, share, distinctUntilChanged } from 'rxjs/operators';
import { BREAKPOINTS, BreakpointsConfig, BreakpointType } from '../breakpoints';

@Injectable()
export class ViewportService {
  readonly defaultAuditTime = 20;
  private changes$: Observable<BreakpointType | null>;

  constructor(@Inject(DOCUMENT) private document: Document,
              @Inject(BREAKPOINTS) private breakpointsConfig: BreakpointsConfig) {
    const _window = this.getWindow();
    if (_window) {
      const resize$ = fromEvent(_window, 'resize');
      const orientationchange$ = fromEvent(_window, 'orientationchange');
      this.changes$ = merge(resize$, orientationchange$).pipe(
        startWith(null),
        auditTime(this.defaultAuditTime),
        map(() => this.getCurrentBreakpoint()),
        distinctUntilChanged(),
        share(),
      );
    } else {
      this.changes$ = of(null);
    }
  }

  changes(): Observable<BreakpointType | null> {
    return this.changes$;
  }

  getCurrentBreakpoint(): BreakpointType | null {
    const width = this.getViewportWidth();
    if (width === null) {
      return null;
    }
    if (width < this.breakpointsConfig.medium) {
      return 'small';
    }
    if (width < this.breakpointsConfig.large) {
      return 'medium';
    }
    return 'large';
  }

  getViewportWidth(): number {
    const _window = this.getWindow();
    if (_window) {
      return _window.innerWidth;
    }
    return null;
  }

  private getWindow(): Window {
    return this.document.defaultView || window;
  }
}
