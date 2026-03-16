import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginKey = 'isLoggedIn';
  private readonly usernameKey = 'username';

  login(username: string): void {
    sessionStorage.setItem(this.loginKey, 'true');
    sessionStorage.setItem(this.usernameKey, username);
  }

  logout(): void {
    sessionStorage.removeItem(this.loginKey);
    sessionStorage.removeItem(this.usernameKey);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem(this.loginKey) === 'true';
  }

  getUsername(): string {
    return sessionStorage.getItem(this.usernameKey) ?? '';
  }
}
