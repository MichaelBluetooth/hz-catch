import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserProfile } from 'src/app/core/models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(){
    return this.http.get('api/users/profile').pipe(map((resp: any) => {
      return resp as UserProfile;
    }));
  }

  getUser(id: number){
    return this.http.get(`api/users/${id}`).pipe(map((resp: any) => {
      return resp as UserProfile;
    }));
  }

  updateUser(id: number, username: string, email: string, password?: string){
    const data: any = {
      username,
      email    
    };
    if(password){
      data.password = password;
    }
    
    return this.http.put(`api/users/${id}`, data);
  }
}
