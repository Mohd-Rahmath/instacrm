import {Injectable} from '@angular/core';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class JavascriptService {

  constructor() {
  }

  get nativeWindow(): any {
    return _window();
  }

  /**
   *
   * @param url
   */
  injectJsScript(url: string): void {
    const document = this.nativeWindow.document;

    let js = document.getElementById('razorPayScript');
    if (!js) {
      let js = document.createElement('script');
      js.setAttribute('src', url);
      js.setAttribute('id', 'razorPayScript');
      document.body.append(js);
    }
  }


}
