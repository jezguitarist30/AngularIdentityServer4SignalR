import { Injectable } from '@angular/core';
import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class DrawingService {

  private loginUrl = 'https://localhost:5001/connect/token';
  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http) { }


  login(username, password): any {

    const formData = this.transformRequest({
      'grant_type': 'password',
      username: username,
      password: password,
      'client_id': 'MyClient',
      'client_secret': 'my-client-secret'
    });

    return this.http.post(this.loginUrl, formData, this.options)
      .pipe(map((response: Response) => {
        const data = response.json();
        return data['access_token'];
      }));
  }

  private transformRequest(obj) {
    const str = [];

    Object.keys(obj).forEach(function (key) {
      str.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    });

    return str.join('&');
  }
}
