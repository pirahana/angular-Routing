import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';
import { Router, Event, NavigationStart, NavigationCancel, NavigationError, NavigationEnd } from '@angular/router';
import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  isLoading: boolean = true;


  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvents(routerEvent);
    });
   }

   displayMessages() {
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    this.messageService.isDisplayed = true;
   }

   hideMessages() {
     this.messageService.isDisplayed = false;
     this.router.navigate([{ outlets: { popup: null } }]);
   }

   checkRouterEvents(routerEvent: Event): void {
    if(routerEvent instanceof NavigationStart) {
      this.isLoading = true;
    }
    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
          this.isLoading = false;
        }
   }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    this.router.navigate(['/welcome']);
  }
}
