import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private api: ApiService
  ) {
  }

  /**
   *
   */
  findById() {
    return this.api.get(`user/account/find/byId`);
  }

  /**
   * @param mobile
   */
  findByMobile(mobile: any) {
    return this.api.get(`user/account/find/byMobile/${mobile}`);
  }

  /**
   * @param mobile
   */
  checkIfExists(mobile: any) {
    return this.api.get(`user/account/exists/${mobile}`);
  }


  /**
   * @param query
   */
  search(query: any) {
    return this.api.get(`user/account/search?q=${query}`);
  }


  /**
   * @param query
   */
  getBalance() {
    return this.api.get(`user/wallet/balance`);
  }
}
