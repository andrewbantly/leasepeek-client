import { InjectionToken } from '@angular/core';
import { Appconfig } from './appconfig';
import { environment } from 'src/environments/environemnt';

export const APP_SERVICE_CONFIG = new InjectionToken<Appconfig>('app.config');

export const APP_CONFIG: Appconfig = {
  apiEndPoint: environment.apiEndpoint
}