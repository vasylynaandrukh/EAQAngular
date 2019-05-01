
import {Injectable} from '@angular/core';
import {Response} from '../models/Response';
import {Hosts} from '../models/Hosts';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(
    private http: HttpClient
  ) {
  }

  foodApiUrl = 'foods';

  getSomeFood(type): Observable<Response> {
    const headers = new HttpHeaders()
      .set('authorization', localStorage.getItem('token'));
    return this.http.get<Response>(`${Hosts.API_HOST}/${this.foodApiUrl}/bytype/${type}`, {headers});
  }
}
