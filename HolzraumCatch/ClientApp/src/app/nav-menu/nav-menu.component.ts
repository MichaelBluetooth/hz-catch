import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  loggedIn$ = this.auth.loggedIn$;

  constructor(private auth: AuthService, private router: Router){}

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  username(){
    return this.auth.currentUsername();
  }

  logout(){
    this.router.navigate(['/login']);
    this.auth.logout();
  }
}
