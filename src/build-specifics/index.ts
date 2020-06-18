import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

const buildSpecificModules = [
  StoreDevtoolsModule.instrument({
    maxAge: 50,
    logOnly: environment.production,
  }),
];

export { buildSpecificModules };
