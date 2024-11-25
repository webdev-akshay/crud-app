import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private ApiUrl="http://localhost:3000"

  constructor(private http:HttpClient){}

  getData():Observable<any>{
    return this.http.get(`${this.ApiUrl}/employees`)
  }
  deleteData(id:string):Observable<any>{
  return this.http.delete(`${this.ApiUrl}/employees/${id}`)
  }

}
