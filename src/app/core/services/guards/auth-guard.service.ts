// import { Injectable } from '@angular/core';
// import { Router, CanActivate } from '@angular/router';
// import { AuthenticationService } from './authentication.service';

// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(public authService: AuthenticationService, public router: Router) { }
//     canActivate(): boolean {
//         if (!this.authService.isLoggedIn()) {
//             this.router.navigate(['/auth/login']);
//             return false;
//         }
//         return true;
//     }

// }