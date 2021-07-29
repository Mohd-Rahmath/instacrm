import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverEndpoint = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) {
    if (environment.production) {
      this.serverEndpoint = environment.apiUrl;
    }
  }

  /**
   *
   * @param endpoint
   * @param data
   * @param headers
   */
  post(endpoint, data, headers?: {}) {
    return this.http.post(this.serverEndpoint + endpoint, data, headers);
  }

  /**
   *
   * @param endpoint
   * @param params
   */
  get(endpoint, params?: {}) {
    return this.http.get(this.serverEndpoint + endpoint, params);
  }

  /**
   *
   * @param endpoint
   * @param params
   */
  delete(endpoint, params?: {}) {
    return this.http.delete(this.serverEndpoint + endpoint, params);
  }

  /**
   *
   * @param endpoint
   * @param params
   */
  put(endpoint, params?: {}) {
    return this.http.put(this.serverEndpoint + endpoint, params);
  }
}
