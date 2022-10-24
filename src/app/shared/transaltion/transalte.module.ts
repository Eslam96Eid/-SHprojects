import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';

const httpLoaderFactory = (http: HttpClient) =>  new TranslateHttpLoader(http, 'assets/i18n/', '.json');

const translateComplierFactory = () => new TranslateMessageFormatCompiler();

const translateLoader: Provider = {
  provide: TranslateLoader,
  useFactory: httpLoaderFactory,
  deps: [HttpClient]
};

const translateCompiler: Provider = {
  provide: TranslateCompiler,
  useFactory: translateComplierFactory
};

@NgModule({
  declarations: [],
  imports: []
})

export class DTransalteModule {
  static forRoot(): ModuleWithProviders<DTransalteModule> {
    return TranslateModule.forRoot({
      loader: translateLoader,
      compiler: translateCompiler
    });
  }

  static forChild(): ModuleWithProviders<DTransalteModule> {
    return TranslateModule.forChild({
      loader: translateLoader,
      compiler: translateCompiler,
      isolate: false
    });
  }
}
