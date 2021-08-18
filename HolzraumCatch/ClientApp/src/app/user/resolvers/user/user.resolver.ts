import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserProfile } from 'src/app/core/models/user-profile';
import { ProfileService } from '../../services/profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<UserProfile> {
  constructor(private users: ProfileService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserProfile> {
    return this.users.getUser(route.params["id"]);
  }
}
