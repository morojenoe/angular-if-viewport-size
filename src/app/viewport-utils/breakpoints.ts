import { InjectionToken } from '@angular/core';

export interface BreakpointsConfig {
  medium: number;
  large: number;
};

export const BREAKPOINTS = new InjectionToken<BreakpointsConfig>('Breakpoints config token ViewportUtils Module');

export type BreakpointType = 'small' | 'medium' | 'large';
