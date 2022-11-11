import { Pipe, PipeTransform } from '@angular/core';
import { Localization } from 'src/app/core/Models/global/global.model';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Pipe({
  name: 'currentLang'
})
export class CurrentLangPipe implements PipeTransform {


  constructor(private translationService: TranslationService){}
  transform(value: Localization, ...args: unknown[]): unknown {
    if(!value) return null
    
    let newVal 
    
    let lang = this.translationService.lang
    lang ==='ar' ? newVal= value?.ar : newVal=value?.en

    return newVal;
  }

}
