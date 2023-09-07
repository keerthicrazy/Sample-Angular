import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login():Observable<any>{
  return this.http.get("https://mocki.io/v1/611a3036-4420-48a5-b8da-9b461853cdd2");
  }

  submit():Observable<any>{
    return this.http.get("https://mocki.io/v1/7f434df6-a4ac-4817-ab7c-dd39a564d01d");
    }
}
