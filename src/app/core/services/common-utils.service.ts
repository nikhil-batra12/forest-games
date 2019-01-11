import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilsService {

  private defaultMsg = 'Something Went Wrong!';

  constructor(
    private httpClient: HttpClient
  ) { }

  parseResponse(response: any, silent?: boolean) {
    if (response.success) {
      return response;
    } else {
      const errorMsg = response.message ? response.message.text : this.defaultMsg;
      if (!silent) {  }
      throw response;
    }
  }

  postRequest(config): Observable<any> {
    const headers = new HttpHeaders(config.headers);
    const observe: string = config.getCompleteResponse ? 'response' : 'body';
    const options = { headers, observe: observe as 'body' };
    return this.httpClient.post(config.url, config.data, options).pipe(
      map(
        response => {
          if (config.skipParsing) {
            return response;
          } else {
            return this.parseResponse(response, config.silent);
          }

        }
      ),
      catchError(
        error => {
          return throwError(error || 'Server error');
        }
      )
    );
  }

  getRequest(config) {
    const headers = new HttpHeaders(config.headers);
    const observe: string = config.getCompleteResponse ? 'response' : 'body';
    const options: any = { headers, observe: observe as 'body', params: config.params };
    if (config.responseType) {
      options.responseType = config.responseType;
    }
    const url = config.url;
    return this.httpClient.get(url, options).pipe(
      map(
        response => {
          if (config.skipParsing) {
            return response;
          } else {
            return this.parseResponse(response, config.silent);
          }
        }
      ),
      catchError(
        error => {
          return throwError(error || 'Server error');
        }
      )
    );
  }

  trimFields(){
    
  }
}
