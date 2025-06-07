import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigSandbox, SessionNames } from 'fararu-common-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {
  globalLoadingShowState: boolean = false;

  constructor(
    private _configSandbox: ConfigSandbox,
    private _cdr: ChangeDetectorRef,
    protected translateService: TranslateService,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this._setLocalize(localStorage.getItem(SessionNames.LANGUAGE) || 'fa');
    this._configSandbox.globalLoadingShowState$.subscribe((state) => {
      const needUpdate = this.globalLoadingShowState !== state;
      this.globalLoadingShowState = state;
      if (needUpdate) this._cdr.detectChanges();
    });
  }



  private _setLocalize(lang: string) {
    this.translateService.use(lang);
    document.documentElement.setAttribute('lang', lang);
    this._setBodyDirectionByLang(lang);
    this._setFontByLang(lang);
  }

  private _loadFontStyle(styleName: string) {
    const head = this._document.getElementsByTagName('head')[0];
    const tageId = 'font-style';
    const fontLink = this._document.getElementById(tageId) as HTMLLinkElement;
    if (fontLink) {
      fontLink.href = styleName;
    } else {
      const style = this._document.createElement('link');
      style.id = tageId;
      style.rel = 'stylesheet';
      style.href = `${styleName}`;
      head.appendChild(style);
    }
  }

  private _setBodyDirectionByLang(lang: string) {
    switch (lang) {
      case 'fa':
      case 'ar':
        document.body.setAttribute('dir', 'rtl');
        document.body.style.textAlign = 'right';
        break;
      default:
        document.body.removeAttribute('dir');
        document.body.style.textAlign = '';
        break;
    }
  }

  private _setFontByLang(lang: string) {
    switch (lang) {
      case 'fa':
        this._loadFontStyle('fa-font.css');
        break;

      case 'en':
        this._loadFontStyle('en-font.css');
        break;
    }
  }
}
