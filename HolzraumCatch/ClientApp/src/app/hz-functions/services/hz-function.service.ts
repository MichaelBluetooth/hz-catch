import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HzFunction } from 'src/app/core/models/hz-function';

@Injectable({
  providedIn: 'root'
})
export class HzFunctionService {

  constructor(private http: HttpClient) { }

  getFunctions(){
    return this.http.get('api/hzfunctions').pipe(map((resp => {
      return resp as HzFunction[];
    })));
  }

  createFunction(func: HzFunction){
    return this.http.post('api/hzfunctions', func).pipe(map((resp => {
      return resp as HzFunction;
    })));
  }
}
