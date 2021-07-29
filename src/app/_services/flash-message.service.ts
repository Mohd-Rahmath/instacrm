import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlashMessageService {

  constructor() {
  }

  getStatusMessage(status) {
    let message = '';
    let classe = '';
    if (!!(status) && status.length) {
      if (status === 'add') {
        message = 'Bus details added';
        classe = 'alert-success';
      } else if (status === 'update') {
        message = 'Bus details updated';
        classe = 'alert-info';
      } else if (status === 'delete') {
        message = 'Bus deleted successfully';
        classe = 'alert-danger';
      }
      let json = {message: message, classe: classe};
      return json;
    }

  }
}
