import { EmailValuesDto } from './../model/model.emailValuesDto';
import { API_URL } from 'src/environment/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailAjaxService {

constructor(
  private httpClient: HttpClient
) { }

private url = API_URL + '/email';

public sendEmail(emailValuesDTO: EmailValuesDto): Observable<any> {
  return this.httpClient.post<any>(this.url + 'recover-password', emailValuesDTO);
}

public changePassword(emailValuesDTO: EmailValuesDto): Observable<any> {
  return this.httpClient.post<any>(this.url + 'change-password', emailValuesDTO);
}

}
