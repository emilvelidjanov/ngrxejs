import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from 'src/environments/environment';

const exportModules = [
    StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production
      }),
];

export { exportModules };