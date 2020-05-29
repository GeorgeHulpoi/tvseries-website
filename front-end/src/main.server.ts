import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

if (environment.production) 
{
    enableProdMode();
}

export { ApplicationServerModule } from './app/modules/application.server';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
