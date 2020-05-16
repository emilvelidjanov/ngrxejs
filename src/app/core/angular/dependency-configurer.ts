import { InjectionToken, Provider } from '@angular/core';

export class DependencyConfigurer<DependencyType> {
  private token: InjectionToken<DependencyType>;
  private provider: Provider;

  constructor(configuration: DependencyConfiguration) {
    this.token = new InjectionToken<DependencyType>(configuration.tokenDescription);
    this.provider = {
      provide: this.token,
      useFactory: configuration.factory,
      deps: configuration.dependencies,
    };
  }

  public getToken(): InjectionToken<DependencyType> {
    return this.token;
  }

  public getProvider(): Provider {
    return this.provider;
  }
}

export interface DependencyConfiguration {
  tokenDescription: string;
  dependencies: any[];
  factory: (...dependencyTokens: any[]) => object;
}
