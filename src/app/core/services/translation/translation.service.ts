import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';
import { PrimeNGConfig } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private languageKey = 'preferredLanguage';
  readonly html: HTMLElement;
  private currentLanguage: string;
  private readonly ar = 'ar';
  private readonly en = 'en';

  get isArabic(): boolean {
    return localStorage.getItem(this.languageKey) === this.ar;
  }
  get lang(): string |'ar'| 'en'{

    return localStorage.getItem(this.languageKey)

  }


  constructor(
    private translateService: TranslateService,
     @Inject(DOCUMENT) private document: Document,
     private config: PrimeNGConfig,) {

    this.html =  this.document.getElementsByTagName('html')[0];
    this.currentLanguage = localStorage.getItem(this.languageKey || environment.defaultLang);
  }


  init(): void {
    // const lang = environment.defaultLang;
    this.translateService.setDefaultLang(this.currentLanguage );
    this.handleLanguageChange(this.currentLanguage);

  }


  handleLanguageChange(lang: string): void {
    this.translateService.use(lang);
    // this.translateService.stream('primeng').subscribe((res) => {
    //   this.config.setTranslation(res)
    // });
    localStorage.setItem(this.languageKey, lang === this.ar ? this.ar : this.en);
    this.html.lang = lang;
    const currentDirection = lang === this.ar ? 'rtl' : 'ltr';
    this.document.body.dir = currentDirection;
    console.log('in handle app language');
    // window.location.reload();
  }
}
