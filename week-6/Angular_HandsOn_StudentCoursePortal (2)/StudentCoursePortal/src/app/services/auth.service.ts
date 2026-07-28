import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Hardcoded for demo purposes - a real app would set this after a login call.
  isLoggedIn = true;
}
